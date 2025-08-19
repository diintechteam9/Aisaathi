const { putobject, getobject, deleteObject, s3Client } = require("../utils/s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const SavedResume = require("../models/SavedResume");
const Client = require("../models/Client");

// Helper: sanitize filename
const sanitizeFileName = (name) => (name || "resume.pdf").replace(/[^a-zA-Z0-9_.-]/g, "_");

// GET /resumes/upload-url?fileName=&fileType=
const getResumeUploadUrl = async (req, res) => {
  try {
    const { fileName = "resume.pdf", fileType = "application/pdf" } = req.query;
    if (!fileName || !fileType) {
      return res.status(400).json({ success: false, message: "fileName and fileType are required" });
    }

    const safeFileName = sanitizeFileName(fileName);

    // req.clientId is the public userId string like CLIxxxxx from checkClientAccess
    // req.user is the authenticated end-user from verifyUserToken
    const key = `resumes/${req.clientId}/${req.user._id}/${Date.now()}_${safeFileName}`;
    const uploadUrl = await putobject(key, fileType);

    return res.status(200).json({ success: true, uploadUrl, key });
  } catch (error) {
    console.error("getResumeUploadUrl error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to get upload URL" });
  }
};

// POST /resumes  { key, fileName, fileType, title, templateName, status, fileSize }
const saveResumeRecord = async (req, res) => {
  try {
    const { key, fileName, fileType = "application/pdf", title, templateName, status = "saved", fileSize } = req.body || {};
    if (!key) {
      return res.status(400).json({ success: false, message: "S3 key is required" });
    }

    // Fetch signed URL for convenience (will expire); clients should rely on fresh get URLs for viewing
    const signedUrl = await getobject(key);

    // Find the client ObjectId from the public client userId string in req.clientId
    const clientDoc = await Client.findOne({ userId: req.clientId }).select("_id userId");
    if (!clientDoc) {
      return res.status(400).json({ success: false, message: "Client not found" });
    }

    const saved = await SavedResume.create({
      client: clientDoc._id,
      user: req.user._id,
      clientUserId: req.clientId,
      resumeKey: key,
      resumeUrl: signedUrl,
      fileName,
      fileType,
      fileSize,
      title,
      templateName,
      status,
    });

    return res.status(201).json({ success: true, resume: saved });
  } catch (error) {
    console.error("saveResumeRecord error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to save resume record" });
  }
};

// GET /resumes/saved
const listSavedResumes = async (req, res) => {
  try {
    const clientDoc = await Client.findOne({ userId: req.clientId }).select("_id");
    if (!clientDoc) {
      return res.status(400).json({ success: false, message: "Client not found" });
    }

    let resumes = await SavedResume.find({ client: clientDoc._id, user: req.user._id })
      .sort({ createdAt: -1 });

    // Re-sign URLs for each record
    const withUrls = await Promise.all(resumes.map(async (r) => {
      try {
        const freshUrl = await getobject(r.resumeKey);
        r.resumeUrl = freshUrl; // update in-memory; optional to persist
      } catch {}
      return r;
    }));

    return res.status(200).json({ success: true, resumes: withUrls });
  } catch (error) {
    console.error("listSavedResumes error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to load resumes" });
  }
};

// GET /resumes/:id/download -> stream PDF
const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    const clientDoc = await Client.findOne({ userId: req.clientId }).select("_id");
    if (!clientDoc) {
      return res.status(400).json({ success: false, message: "Client not found" });
    }

    const resume = await SavedResume.findOne({ _id: id, client: clientDoc._id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: resume.resumeKey,
    });
    const data = await s3Client.send(command);

    // Set headers and stream
    res.setHeader("Content-Type", resume.fileType || "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${sanitizeFileName(resume.fileName || "resume.pdf")}\"`);

    data.Body.pipe(res);
  } catch (error) {
    console.error("downloadResume error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to download" });
  }
};

// DELETE /resumes/:id
const deleteSavedResume = async (req, res) => {
  try {
    const { id } = req.params;
    const clientDoc = await Client.findOne({ userId: req.clientId }).select("_id");
    if (!clientDoc) {
      return res.status(400).json({ success: false, message: "Client not found" });
    }

    const resume = await SavedResume.findOneAndDelete({ _id: id, client: clientDoc._id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    try {
      await deleteObject(resume.resumeKey);
    } catch (e) {
      // Log but still return success for record deletion
      console.error("S3 delete error:", e);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("deleteSavedResume error:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to delete" });
  }
};

module.exports = {
  getResumeUploadUrl,
  saveResumeRecord,
  listSavedResumes,
  downloadResume,
  deleteSavedResume,
};


