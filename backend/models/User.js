const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number:{ type:String,  required: function () {
    // Password is required only if not using Google auth
    return !this.googleId;
  }},
  clgname:{ type:String,required: function () {
    // Password is required only if not using Google auth
    return !this.googleId;
  },},
  city:{ type:String, required: function () {
    // Password is required only if not using Google auth
    return !this.googleId;
  },},
  pincode:{ type:String, required: function () {
    // Password is required only if not using Google auth
    return !this.googleId;
  },},
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
