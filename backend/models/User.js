const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      // Password is required only if not using Google auth
      return !this.googleId;
    },
  },
  clientId: {
    type: "String",
  },
  //goole user data
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  googlePicture: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  isprofileCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
