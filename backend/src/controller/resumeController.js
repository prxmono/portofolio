const resumeModel = require('../models/resumeModel');
const path = require('path');
const fs = require('fs');

const getAllResumes = async (req, res) => {
    try {
        const resumes = await resumeModel.getAllResumes();
        res.status(200).json({
            success: true,
            total: resumes.length,
            data: resumes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const getActiveResume = async (req, res) => {
    try {
        const resume = await resumeModel.getActiveResume();
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Belum ada CV aktif yang diunggah'
            });
        }
        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await resumeModel.getResumeById(id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Data CV tidak ditemukan'
            });
        }
        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File CV format PDF wajib diunggah'
            });
        }

        const { title, version, is_active } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Judul CV (title) wajib diisi'
            });
        }

        const data = {
            title,
            file_name: req.file.filename,
            file_path: `/uploads/cv/${req.file.filename}`,
            file_size: req.file.size,
            version: version || '1.0',
            is_active: is_active === 'true' || is_active === true || is_active === '1'
        };

        const result = await resumeModel.createResume(data);

        res.status(201).json({
            success: true,
            message: 'File PDF CV berhasil diunggah',
            data: {
                id: result.insertId,
                file_url: data.file_path,
                ...data
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, version, is_active } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Judul CV (title) wajib diisi'
            });
        }

        const data = {
            title,
            version: version || '1.0',
            is_active: is_active === 'true' || is_active === true || is_active === '1'
        };

        const result = await resumeModel.updateResume(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data CV tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data CV berhasil diperbarui'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await resumeModel.getResumeById(id);
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Data CV tidak ditemukan'
            });
        }
        const physicalPath = path.join(__dirname, '../../public/uploads/cv', resume.file_name);
        if (fs.existsSync(physicalPath)) {
            fs.unlinkSync(physicalPath);
        }

        await resumeModel.deleteResume(id);

        res.status(200).json({
            success: true,
            message: 'File CV dan datanya berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllResumes,
    getActiveResume,
    getResumeById,
    uploadResume,
    updateResume,
    deleteResume
};