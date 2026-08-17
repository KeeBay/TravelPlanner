const jwt = require('jsonwebtoken')

function AuthMiddleware(req, res, next) {

    //getting the token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            status: 401, 
            message: "Access denied. No token provided or wrong format." 
        });
    }
    
    //check if there is the token we need
     const token = authHeader.split(' ')[1];

    try{
        //token decoding
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            //giving the req the token datas
            req.user = decodedToken; 
            next();
        }
        catch (error) {
            console.error("Auth Middleware Error:", error.message);
            return res.status(401).json({
                error: true,
                status: 401,
                message: "Invalid or expired token."
            });
    }
}

module.exports = AuthMiddleware;