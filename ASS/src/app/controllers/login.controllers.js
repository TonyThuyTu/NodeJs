const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserLogin {
    // Hiển thị trang đăng nhập
    index(req, res) {
        res.render("auth/login", { title: "Login", errorMessage: "", errors: {} });
    }

    // Xử lý đăng nhập
    async login(req, res) {
        try {
            const { email, password } = req.body;
            let errors = {};

            // Kiểm tra nếu email hoặc mật khẩu trống
            if (!email) errors.email = "Vui lòng nhập email!";
            if (!password) errors.password = "Vui lòng nhập mật khẩu!";

            if (Object.keys(errors).length > 0) {
                return res.render("auth/login", { title: "Login", errorMessage: "Vui lòng kiểm tra thông tin!", errors });
            }

            // Tìm user theo email
            const user = await User.findOne({ email });
            if (!user) {
                return res.render("auth/login", {
                    title: "Login",
                    errorMessage: "❌ Email hoặc mật khẩu không đúng!",
                    errors: { email: "Email không tồn tại!" },
                });
            }

            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render("auth/login", {
                    title: "Login",
                    errorMessage: "❌ Email hoặc mật khẩu không đúng!",
                    errors: { password: "Mật khẩu không chính xác!" },
                });
            }

            // Tạo token và lưu vào cookie
            const token = jwt.sign({ id: user._id }, "secret-key", { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true });

            console.log("✅ Đăng nhập thành công!");
            res.redirect("/");
        } catch (error) {
            console.error("🚨 Lỗi đăng nhập:", error);
            res.status(500).send("Lỗi server");
        }
    }
}

module.exports = new UserLogin();
