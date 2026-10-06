const experiencesModel = require('../models/experiencesModel');

const getAllExperiences = async (req, res) => {
    try {
        const experiences = await experiencesModel.getAllExperiences();
        res.status(200).json({ success: true, total: experiences.length, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const getExperiencesById = async (req, res) => {
    try { 
        const { id } = req.params;
        const experiences = await experiencesModel.getExperiencesById(id);
        if (!experiences) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        res.status(200).json({ success: true, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const createExperiences = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title) return res.status(400).json({ success: false, message: 'Nama experiences wajib diisi' });
         const result = await experiencesModel.createExperiences(data)
        res.status(201).json({ success: true, message: 'experiences ditambahkan', data: { id: result.insertId  } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const updateExperiences = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data.title) return res.status(400).json({ success: false, message: 'Nama experiences wajib diisi' });

        const result = await experiencesModel.updateExperiences(id, data);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        res.status(200).json({ success: true, message: 'experiences diperbarui' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const deleteExperiences = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await experiencesModel.deleteExperiences(id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        res.status(200).json({ success: true, message: 'experiences dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = { getAllExperiences, getExperiencesById, createExperiences, updateExperiences, deleteExperiences };