const bcrypt = require('bcryotjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!uername || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, dan password wajib diisi!'
            });
        }

        const existingUsername = await userModel.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan, silahkan pilih username lain!'
            });
        }

        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar, silahkan gunakan email lain!'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await userModel.createUser({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            success: true,
            message: 'Registrasi pengguna berhasil!',
            data: {
                id: result.insertId,
                username,
                email,
                role: role || 'user'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error saat registrasi',
            error: error.message
        });
    }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email dan password wajib diisi!'
      });
    }

    let user = await userModel.findByUsername(identifier);
    if (!user) {
      user = await userModel.findByEmail(identifier);
    }
     if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Kombinasi kredensial (username/email) tidak ditemukan!'
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password salah!'
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'kunci_rahasia_portofolio_super_aman_12345';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

     res.status(200).json({
      success: true,
      message: 'Login berhasil!',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error saat login',
      error: error.message
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Data pengguna tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      success: true,
      total: users.length,
      data: users
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
  register,
  login,
  getMyProfile,
  getAllUsers
};
