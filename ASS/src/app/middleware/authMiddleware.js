const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
      res.locals.user = user; // Truyền user vào biến toàn cục để Handlebars có thể sử dụng
    }

    next();
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    next();
  }
};

module.exports = authMiddleware;
