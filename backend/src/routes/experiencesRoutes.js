const express = require('express');
const router = express.Router();
const experiencesController = require('../controller/experiencesController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', experiencesController.getAllExperiences);
router.get('/:id', experiencesController.getExperiencesById);
router.post('/', verifyToken, authorizeRoles('admin'), experiencesController.createExperiences);
router.put('/:id', verifyToken, authorizeRoles('admin'), experiencesController.updateExperiences);
router.delete('/:id', verifyToken, authorizeRoles('admin'), experiencesController.deleteExperiences);

module.exports = router;