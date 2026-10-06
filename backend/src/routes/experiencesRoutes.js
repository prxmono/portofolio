const express = require('express');
const router = express.Router();
const experiencesController = require('../controller/experiencesController');

router.get('/', experiencesController.getAllExperiences);
router.get('/:id', experiencesController.getExperiencesById);
router.post('/', experiencesController.createExperiences);
router.put('/:id', experiencesController.updateExperiences);
router.delete('/:id', experiencesController.deleteExperiences);

module.exports = router;