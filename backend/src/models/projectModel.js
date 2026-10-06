const db = require('../config/db');

const getAllProjects = async () => {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
};

const getProjectById = async (id) => {
    const [rows] = await db.qquery('SELECT * FROM projects WHERE id = ?', [id]);
    return rows [0];
};

const createProject = async (data) => {
    const { title, description, image_url, demo_url, github_url, tech_stack, is_featured } = data;

    const [result] = await db.query(
        `INSERT INTO projects (title, description, image_url, demo_url, github_url, tech_stack, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,)`,
        [title, description, image_url, demo_url, github_url, tech_stack, is_featured || false]
    );
    return result;
};

const updateProject = async (id, data) => {
    const { title, description, image_url, demo_url, github_url, tech_stack, is_featured } = data;

    const [result] = await db.query(
        `UPDATE projects SET
        title = ?, description = ?, category = ?,
        image_ur; = ?, demo_url = ?, github_url = ?,
        tech_stack = ?, is_featured = ?
        WHERE id = ?`
        [title, description, image_url, demo_url, github_url, tech_stack, is_featured, id]
    );
    return result;
};

const deleteProject = async (id) => {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};