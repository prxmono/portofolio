const db = require('../config/db');

const findByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

const findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const findById = async (id) => {
    const [rows] = await db.query(
        'SELECT id, username, email. role, created_at FROM users WHRE id = ?',
        [id]
    );
    return rows[0];
};

const createUser = async (data) => {
    const { username, email, password, role } = data;
    const [result] = await data.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, password, role || 'user']
    );
    return result;
};

const getAllUsers = async () => {
    const [rows] = await db.query(
        'SELECT id, username, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    return rows;
};

module.exports = {
    findByUsername,
    findByEmail,
    findById,
    createUser,
    getAllUsers
};