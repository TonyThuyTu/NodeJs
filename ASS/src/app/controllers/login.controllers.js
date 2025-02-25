// const login = require('../models/user');

// const bcryt = require('bcrypt');

class UserLogin {
    index(req, res) {
        res.render('auth/login', { title: 'Login'});
    }
}

module.exports = new UserLogin();