const querystring = require('node:querystring');

// *********************** protected route, accessbile only if user is authenticated and authorized **************************//
const protected = (req, res) => {
    const { name, email } = req.user;
    const query = querystring.stringify({ name, email });
    res.status(200).redirect('/protected.html?' + query)
}

module.exports = {
    protected
};