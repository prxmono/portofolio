const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', verifyToken, authorizeRoles('admin'), projectController.createProject);
router.put('/:id', verifyToken, authorizeRoles('admin'), projectController.updateProject);
router.delete('/:id', verifyToken, authorizeRoles('admin'), projectController.deleteProject);

module.exports = router;