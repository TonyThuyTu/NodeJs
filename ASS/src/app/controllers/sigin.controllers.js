const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import model User
const jwt = require('jsonwebtoken');


class UserSignup {
    index(req, res) {
        res.render('auth/signin', { title: 'Sign Up', errors: {} });
    }

    async register(req, res) {
        try {
            const { username, email, phone, password } = req.body;
            let errors = {};

            // Kiểm tra dữ liệu đầu vào
            if (!username) errors.username = 'Tên đăng nhập không được để trống!';
            if (!email) errors.email = 'Email không được để trống!';
            if (!phone) errors.phone = 'Số điện thoại không được để trống!';
            if (!password) errors.password = 'Mật khẩu không được để trống!';
            if (phone && !/^\d{10,11}$/.test(phone)) {
                errors.phone = 'Số điện thoại không hợp lệ!';
            }

            // Kiểm tra username hoặc email đã tồn tại
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                errors.username = 'Tên đăng nhập hoặc email đã tồn tại!';
            }

            // Nếu có lỗi, render lại trang đăng ký với thông báo lỗi
            if (Object.keys(errors).length > 0) {
                return res.render('auth/signin', { title: 'Sign Up', errors });
            }

            // Mã hóa mật khẩu
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Tạo người dùng mới
            const newUser = new User({ username, email, phone, password: hashedPassword });
            await newUser.save();

            // Tạo JWT token
            const token = jwt.sign({ userId: newUser._id, username }, 'TONY_NGUYEN', { expiresIn: '7d' });

            // Lưu token vào cookie
            res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

            // Chuyển hướng về trang chủ
            res.redirect('/');
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            res.render('auth/signin', { title: 'Sign Up', errorMessage: 'Lỗi hệ thống, vui lòng thử lại sau!', errors: {} });
        }
    }
}

module.exports = new UserSignup();
