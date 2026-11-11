const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMyProfile);
router.get('/users', verifyToken, authorizeRoles('admin'), authController.getAllUsers);

module.exports = router;