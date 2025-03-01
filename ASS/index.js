const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/app/middleware/authMiddleware");

const app = express();
const port = 3000;

// Import kết nối MongoDB
const { connectDB } = require("./src/config/data");

// Cấu hình template engine Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'hbs');

// **Chỉ định đường dẫn tới views**
app.set('views', path.join(__dirname, 'src', 'resources', 'views'));

// Cho phép Express đọc dữ liệu form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Nếu cần method-override:
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// **Quan trọng**: phục vụ file tĩnh (public) nằm trong `src/`
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Middleware
app.use(cookieParser());
app.use(authMiddleware); // Dùng middleware trước khi render views

// Import routes
const route = require('./src/routes/index.route'); 
route(app);

// **Chạy server sau khi kết nối DB thành công**
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
