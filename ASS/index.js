const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const methodOverride = require('method-override');
const authMiddleware = require("./src/app/middleware/authMiddleware");

const app = express();
const port = 3000;
require('dotenv').config();

// 📌 Tạo thư mục `public/img/` nếu chưa có
const uploadDir = path.join(__dirname, "public", "img");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📌 Cấu hình Multer để upload ảnh vào thư mục `public/img/`
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

// 📌 Import kết nối MongoDB
const { connectDB } = require("./src/config/data");

// 📌 Cấu hình template engine Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'hbs');

// 📌 Chỉ định đường dẫn tới views
app.set('views', path.join(__dirname, 'src', 'resources', 'views'));

// 📌 Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(authMiddleware); // Dùng middleware trước khi render views

// 📌 Phục vụ file tĩnh (public)
app.use(express.static(path.join(__dirname, 'public')));

// 📌 Import routes
const route = require('./src/routes/index.route'); 
route(app);

// 📌 API Upload ảnh
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Vui lòng chọn ảnh" });
    }
    res.json({ imageUrl: `/img/${req.file.filename}` });
});

// 📌 Chạy server sau khi kết nối DB thành công
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khi kết nối MongoDB, server không thể khởi động:", error);
  }
};

startServer();
