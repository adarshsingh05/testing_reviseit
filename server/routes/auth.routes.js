// In routes/auth.routes.js
const express = require('express');
const { signup, login, logout,verifySignup } = require('../controller/auth.controller');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verifysignup', verifySignup);

module.exports = router;
