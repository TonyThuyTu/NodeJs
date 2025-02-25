



class UserForgot {
    index(req, res) {
        res.render('auth/forgotpass', { title: 'Forgot Pass'});
    }
}

module.exports = new UserForgot();