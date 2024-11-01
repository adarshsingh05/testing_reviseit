// In routes/auth.routes.js
const express = require('express');
const { signup, login, logout,verifySignup,forgotPassword,resetPassword, checkAuth, updateCoins,paperUpload,paperDownload } = require('../controller/auth.controller');
const router = express.Router();
const verifyToken = require("../middleware/verifytoken")
router.get("/checkauth", verifyToken, checkAuth)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verifysignup', verifySignup);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);
router.post('/updatecoins', updateCoins);
router.post('/paperupload', paperUpload);
router.post('/paperdownload', paperDownload);

module.exports = router;
