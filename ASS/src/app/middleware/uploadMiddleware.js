const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img"); // Lưu vào thư mục public/img
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file tránh trùng
    },
});

const upload = multer({ storage });

module.exports = upload;
