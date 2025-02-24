const express = require('express');
const homeRoutes = require('./home.route');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');

function route(app) {
    app.use('/', homeRoutes);
    app.use('/user', userRoutes);
    app.use('/posts', postRoutes);
}

module.exports = route;