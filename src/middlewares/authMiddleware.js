const jwt = require('jsonwebtoken');
const blacklist = require('../model/blacklistModel'); 

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: true,
            status: 401,
            message: "Hozzáférés megtagadva: Hiányzó vagy hibás formátumú token!"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const blacklistedToken = await blacklist.findOne({ where: { token: token } });

        if (blacklistedToken) {
            return res.status(401).json({
                error: true,
                status: 401,
                message: "A token érvénytelen (kijelentkezve)."
            });
        }

        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'titkositokulcs');
        
        
        req.user = decodedToken; 
        
        next();

    } catch (error) {
        console.error("Auth Middleware Hiba:", error.message);
        return res.status(401).json({
            error: true,
            status: 401,
            message: "Érvénytelen vagy lejárt token."
        });
    }
};

module.exports = authMiddleware;