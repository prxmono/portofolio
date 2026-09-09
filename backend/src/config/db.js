const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.nextTick.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

pool.getConnection((err, connectuion) =>  {
    if(err) {
        console.error('Kesalahan Koneksi Database', err.message);
    } else {
        console.log('Berhasil Terhubung ke Database MySQL (db_portofolio)');
        connection.release();
    }
});

module.exports = db;