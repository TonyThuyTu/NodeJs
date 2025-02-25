const express = require('express');
const homeRoutes = require('./home.route');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');
const loginRoutes = require('./login.route');
const SigninRoutes = require('./signin.route');
const ForgotPass = require('./forgot.route');

function route(app) {
    app.use('/', homeRoutes);
    app.use('/user', userRoutes);
    app.use('/posts', postRoutes);
    app.use('/login', loginRoutes);
    app.use('/signin', SigninRoutes);
    app.use('/forgotpass', ForgotPass);
}

module.exports = route;