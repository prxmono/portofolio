const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', profileController.getProfile);
router.put('/:id', verifyToken, authorizeRoles('admin'), profileController.updateProfile);

module.exports = router;