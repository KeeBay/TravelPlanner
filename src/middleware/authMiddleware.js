const jwt = require('jsonwebtoken')

function AuthMiddleware(req, res, next) {

    //getting the token
    const token = req.cookies.token;

    //check if there is the token we need
     if (!token) {
        return res.status(401).json({
            error: true,
            status: 401,
            message: "Not allowed: Missing or wrong token"
        });
    }

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