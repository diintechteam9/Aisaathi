const mongoose = require("mongoose");

const SavedResumeSchema = new mongoose.Schema(
  {
    // Owner client
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    // Specific end user under the client
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Optional: store the client's public userId string for easy filtering if needed
    clientUserId: {
      type: String,
    },
    // S3 storage
    resumeKey: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    // File metadata
    fileName: {
      type: String,
    },
    fileType: {
      type: String,
      default: "application/pdf",
    },
    fileSize: {
      type: Number,
    },
    // Display metadata
    title: {
      type: String,
    },
    templateName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["saved", "draft", "final"],
      default: "saved",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavedResume", SavedResumeSchema);


