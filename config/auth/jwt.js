require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

// *********************** create a token user (payload) ************************//
const createTokenUser = (user) => {
    return {
        name: user.name,
        email: user.email,
        userId: user._id
    }
}

// ************************ sign a jwt ******************************//
const issueJWT = (tokenUser) => {
    //tokenUser is payload
    const secret = process.env.JWT_SECRET
    const options = {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_LIFE
    }

    const token = jwt.sign(tokenUser, secret, options);
    return token;
}

// *********************** attach cookies to response with jwt **************************//
const attachCookiesToResponse = (res, token) => {
    const life = 1000 * 60 * 60 * 24;
    const cookieOptions = {
        expires: new Date(Date.now() + life),
        httpOnly: true
    }

    res.cookie('token', token, cookieOptions)

}

// ************************* verify jwt ***************************//
const verifyJWT = (token) => {
    if (!token) {
        return;
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createTokenUser,
    issueJWT,
    verifyJWT,
    attachCookiesToResponse
}