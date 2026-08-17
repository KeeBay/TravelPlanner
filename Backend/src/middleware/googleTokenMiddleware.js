const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


async function googleTokenMiddleware(req,res, next) {
    
    const {googleToken} = req.body;

    if(!googleToken){
        return res.status(400).json({
            error: true,
            status : 400,
            message: "There was no google Token to varify!"
        });
    }
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const email = payload.email;
        const firstName = payload.given_name || "Google";
        const lastName = payload.family_name || "User";

        const googleUser = {
            payload,
            email,
            firstName,
            lastName
        };

        req.verifiedGoogleUser = googleUser;
        next();
    }
    
    catch (error) {
        console.error("Googleauthentication error", error)
        res.status(401).json({
            error: true,
            status: 401,
            message: "Google token is invalid or timed out!"
        })
    }
}

module.exports = googleTokenMiddleware;