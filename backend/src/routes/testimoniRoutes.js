const express = require('express');
const router = express.Router();
const testimoniController = require('../controller/testimoniController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', testimoniController.getAllTestimoni);
router.get('/:id', testimoniController.getTestimoniById);
router.post('/', testimoniController.createTestimoni);
router.put('/:id', verifyToken, authorizeRoles('admin'), testimoniController.updateTestimoni);
router.delete('/:id', verifyToken, authorizeRoles('admin'), testimoniController.deleteTestimoni);

module.exports = exports = router;