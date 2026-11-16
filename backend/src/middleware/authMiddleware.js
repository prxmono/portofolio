const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak! Token autentikasi tidak ditemukan.'
            });
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Format token salah! Gunakan: Bearer <token>'
            });
        }

        const secret = process.env.JWT_SECRET || 'kunci_rahasia_portofolio_super_aman_12345';
        const decoded = jwt.verify(token, secret);

        req.user = decoded;

        next();
    } catch(error) {
        return res.status(403).json({
            success: false,
            message: 'Token tidak valid atau sudah kadaluarsa!',
            error: error.message
        });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Akses dilarang! Role '${req.user ? req.user.role : 'Guest'}' tidak memiliki izin untuk fitur ini.`
            });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    authorizeRoles
};