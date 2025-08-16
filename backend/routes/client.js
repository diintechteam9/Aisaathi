const express = require('express');
const router = express.Router();
const { loginClient, registerClient, getClientProfile, getUploadUrl, googleLogin } = require('../controllers/client');
const { authMiddleware } = require('../middlewares/authmiddlewares');
const { verifyGoogleToken } = require('../middlewares/googleAuth');

router.get('/upload-url',getUploadUrl)

router.post('/login', loginClient);

router.post('/google-login',verifyGoogleToken, googleLogin);

router.post('/register', registerClient);

router.get('/profile', authMiddleware, getClientProfile);

module.exports = router;

