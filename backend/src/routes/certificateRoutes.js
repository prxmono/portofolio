const express = require('express');
const router = express.Router();
const certificateController = require('../controller/certificateController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', certificateController.getAllCertificates);
router.get('/:id', certificateController.getCertificateById);
router.post('/', verifyToken, authorizeRoles('admin'), certificateController.createCertificate);
router.put('/:id', verifyToken, authorizeRoles('admin'), certificateController.updateCertificate);
router.delete('/:id', verifyToken, authorizeRoles('admin'), certificateController.deleteCertificate);

module.exports = exports = router;
