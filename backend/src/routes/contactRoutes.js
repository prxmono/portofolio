const express = require('express');
const router = express.Router();
const ContactCtrl = require('../controller/contactController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, authorizeRoles('admin'), ContactCtrl.getAll);
router.get('/:id', verifyToken, authorizeRoles('admin'), ContactCtrl.getById);
router.post('/', ContactCtrl.create);
router.delete('/:id', verifyToken, authorizeRoles('admin'), ContactCtrl.remove);

module.exports = router;