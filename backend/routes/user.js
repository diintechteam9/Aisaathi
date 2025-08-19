const express = require('express');
const { loginUser, registerUser, googleLogin, getuserProfile, completeUserProfile } = require('../controllers/user');
const { verifyGoogleToken } = require('../middlewares/googleAuth');
const { verifyUserToken, ensureUserBelongsToClient } = require('../middlewares/authmiddlewares');
const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/google-login',verifyGoogleToken, googleLogin);

router.get('/userprofile',verifyUserToken,ensureUserBelongsToClient,getuserProfile)

// Complete profile after Google login
router.put(
  '/complete-profile',
  verifyUserToken,
  ensureUserBelongsToClient,
  completeUserProfile
);

module.exports = router;

