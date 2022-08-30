const { verifyJWT } = require('../auth/jwt');

// ************************ middleware to check if user is authenticated or not *************************//
const isAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).redirect('/login-failed.html');
    }

    try {
        const { name, userId, email } = verifyJWT(token);
        req.user = {
            name,
            email,
            userId
        }

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).redirect('/login-failed.html');
    }

}

module.exports = {
    isAuth
}