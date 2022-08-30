const express = require('express');
const { isAuth } = require('../config/middleware/isAuth');
const { protected } = require('../controllers/user_controller');
const router = express.Router();

router.route('/protected').get(isAuth, protected);

module.exports = router;