const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load biến môi trường từ file .env
dotenv.config();

class Auth {
  static createJWTToken(email) {
    if (!process.env.SECRET_KEY) {
      console.error("❌ Lỗi: SECRET_KEY chưa được cấu hình trong .env!");
      throw new Error("Server error: Missing SECRET_KEY");
    }

    const payLoad = { email };

    const options = {
      expiresIn: "2h",
      algorithm: "HS256",
    };

    try {
      const token = jwt.sign(payLoad, process.env.SECRET_KEY, options);
      console.log(`✅ Token Created: ${token}`);
      return token;
    } catch (err) {
      console.error("❌ Lỗi khi tạo JWT:", err);
      throw err;
    }
  }

  static verifyJWTToken(req, res, next) {
    let token = null;

    // Lấy token từ header Authorization hoặc Cookie
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      token = authHeader.split(" ")[1]; // "Bearer <token>"
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Kiểm tra SECRET_KEY
    if (!process.env.SECRET_KEY) {
      console.error("❌ Lỗi: SECRET_KEY chưa được cấu hình!");
      return res.status(500).json({ message: "Server error: Missing SECRET_KEY" });
    }

    // Xác thực token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("❌ Lỗi xác thực JWT:", err);
        return res.status(403).json({ message: "Invalid token" });
      }

      req.email = decoded.email;
      console.log(`✅ Xác thực thành công - Email: ${req.email}`);
      next();
    });
  }
}

module.exports = Auth;
