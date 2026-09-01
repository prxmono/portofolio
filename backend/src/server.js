const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat Datang di API Portofolio Dinamis!',
        version: '1.0.0'
        });
    });

app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server Dalam Keadaan Sehat dan Aktif.',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            nama: "Athallah",
            kelas: "XI RPL 1",
            cita_cita: "Arsitek",
            hobi: "Membaca buku & menonton film"
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint Tidak Ditemukan!'
    });
});

app.listen(PORT, () => {
    console.log(`==========================`);
    console.log(`Server berjalan di: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`==========================`)
});