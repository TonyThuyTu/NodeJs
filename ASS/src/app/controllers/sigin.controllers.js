const express = require('express');
const bcrypt = require('bcrypt');
const ModelUser = require('../models/user');


class UserSigin {
    index(req, res) {
        res.render('auth/signin', { title: 'Sign In'});
    }
    
}

module.exports = new UserSigin();