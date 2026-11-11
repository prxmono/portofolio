const express = require('express');
const router = express.Router();
const skillController = require('../controller/skillController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', verifyToken, authorizeRoles('admin'), skillController.createSkill);
router.put('/:id', verifyToken, authorizeRoles('admin'), skillController.updateSkill);
router.delete('/:id', verifyToken, authorizeRoles('admin'), skillController.deleteSkill);

module.exports = router;