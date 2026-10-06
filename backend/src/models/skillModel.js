const db = require('../config/db');

const getAllSkills = async () => {
    const [rows] = await db.query('SELECT * FROM skill ORDER BY category, name');
    return rows;
};

const getSkillById = async (id) => {
    const [rows] = await db.query('SELECT * FROM skill WHERE id = ?', [id]);
    return rows[0];
};

const createSkill = async (data) => {
    const { name, category, level, icon } = data;
    const [result] = await db.query(
        'INSERT INTO skill (name, category, level, icon) VALUES (?, ?, ?, ?)',
        [name, category || 'Other', level || 0, icon]
    );
    return result;
};

const updateSkill = async (id, data) => {
    const { name, category, level, icon } = data;
    const [result] = await db.query(
        'UPDATE skill SET name = ?, category = ?, level = ?, icon = ? WHERE id = ?',
        [name, category, level, icon, id]
    );
    return result;
};

const deleteSkill = async (id) => {
    const [result] = await db.query('DELETE FROM skill WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
};