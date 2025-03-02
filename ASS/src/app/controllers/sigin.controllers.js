const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Đảm bảo đúng đường dẫn

class UserSignup {
  index(req, res) {
    res.render("auth/signup", { title: "Sign Up", errors: {} });
  }

  async register(req, res) {
    try {
      console.log("Đã vào hàm register");
      console.log("Dữ liệu nhận được:", req.body);
  
      const { username, phone, email, password } = req.body;
  
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        return res.render("auth/signup", {
          title: "Sign Up",
          errorMessage: "Email hoặc số điện thoại đã được sử dụng.",
          errors: {},
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, phone, email, password: hashedPassword });
  
      await newUser.save();
      console.log("✅ Đã lưu user vào DB!");
  
      const token = jwt.sign({ id: newUser._id }, "secret-key", { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
  
      // ✅ Đảm bảo user đăng nhập có thể truy cập
      res.redirect("/");
    } catch (error) {
      console.error("❌ Lỗi trong register:", error);
      res.status(500).send("Lỗi server");
    }
  }
  
}

module.exports = new UserSignup();
