class AuthController {


    


    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi đăng xuất:', err);
                return res.redirect('/');
            }
            res.redirect('/login'); // Sau khi logout, chuyển về trang login
        });
    }
}

module.exports = new AuthController();
