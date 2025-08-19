const express = require("express");
const router = express.Router();
const { verifyUserToken, ensureUserBelongsToClient } = require("../middlewares/authmiddlewares");
const { getResumeUploadUrl, saveResumeRecord, listSavedResumes, downloadResume, deleteSavedResume } = require("../controllers/resume");

// Presigned upload URL for S3
router.get("/resumes/upload-url", verifyUserToken, ensureUserBelongsToClient, getResumeUploadUrl);

// Persist a saved resume record after successful S3 upload
router.post("/resumes", verifyUserToken, ensureUserBelongsToClient, saveResumeRecord);

// List saved resumes for the authenticated user under this client
router.get("/resumes/saved", verifyUserToken, ensureUserBelongsToClient, listSavedResumes);

// Download a specific resume
router.get("/resumes/:id/download", verifyUserToken, ensureUserBelongsToClient, downloadResume);

// Delete a saved resume
router.delete("/resumes/:id", verifyUserToken, ensureUserBelongsToClient, deleteSavedResume);

module.exports = router;


