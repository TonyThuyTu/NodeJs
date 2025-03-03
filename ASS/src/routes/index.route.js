const express = require('express');
const homeRoutes = require('./home.route');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');
const loginRoutes = require('./login.route');
const SigninRoutes = require('./signin.route');
const ForgotPass = require('./forgot.route');
const logoutRouters = require('./auth.route');
const editUserRoutes = require('./editUser.route');
const editPost = require('./user.route');

function route(app) {

    app.get('/', (req, res) => {
        res.redirect('/home');
    });

    app.use('/', homeRoutes);
    app.use('/profile', userRoutes);
    app.use('/posts', postRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', SigninRoutes);
    app.use('/forgotpass', ForgotPass);
    app.use('/logout', logoutRouters);
    app.use('/edit', editUserRoutes);
    app.use('/editpost', editPost)
}

module.exports = route;