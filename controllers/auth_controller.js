const { createTokenUser, issueJWT, attachCookiesToResponse } = require('../config/auth/jwt');
const User = require('../models/User');

// *************************** register the user ********************************//
const register = async (req, res) => {

    try {
        const { username: name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(200).redirect('/login.html');
    } catch (error) {
        console.log(error);
    }

}

// *************************** logs in the user ****************************//
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).redirect('/login-failed.html');
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).redirect('/login-failed.html');
    }

    const tokenUser = createTokenUser(user);
    const token = issueJWT(tokenUser);
    attachCookiesToResponse(res, token)

    res.status(200).redirect('/login-success.html');
}

// ************************** logs out the user *****************************//
const logout = async (req, res) => { 
    const cookieOptions = {
        expires: new Date(Date.now() + 10),
        httpOnly: true
    };

    res.cookie('token', "Logout", cookieOptions);
    return res.redirect('/login.html')
}

module.exports = {
    register,
    login,
    logout
}