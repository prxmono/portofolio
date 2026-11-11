const db = require('../config/db');

const getAllTestimoni = async () => {
    const [rows] = await db.query('SELECT * FROM testimoni ORDER BY created_at DESC');
    return rows;
};

const getTestimoniById = async (id) => {
    const [rows] = await db.query('SELECT * FROM testimoni WHERE id = ?', [id]);
    return rows[0];
};

const createTestimoni = async (data) => {
    const { name, roles, company, message, avatar_url, rating } = data;
    const [result] = await db.query(
        'INSERT INTO testimoni (name, roles, company, message, avatar_url, rating) VALUES (?, ?, ?, ?, ?, ?)',
        [name, roles, company, message, avatar_url, rating]
    );
    return result;
};

const updateTestimoni = async (id, data) => {
    const { name, roles, company, message, avatar_url, rating } = data;
    const [result] = await db.query(
        'UPDATE testimoni SET name = ?, roles = ?, company = ?, message = ?, avatar_url = ?, rating = ? WHERE id = ?',
        [name, roles, company, message, avatar_url, rating, id]
    );
    return result;
};

const deleteTestimoni = async (id) => {
    const [result] = await db.query('DELETE FROM testimoni WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};