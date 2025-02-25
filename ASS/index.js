const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Ví dụ nếu có hàm connectDB thì import
const { connectDB } = require("./src/config/data");
connectDB();

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
// Vì đang ở ngoài `src/`, ta dùng: path.join(__dirname, 'src', 'resources', 'views')
app.set('views', path.join(__dirname, 'src', 'resources', 'views'));

// Cho phép Express đọc dữ liệu form
app.use(express.urlencoded({ extended: true }));

// Nếu cần method-override:
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// **Quan trọng**: phục vụ file tĩnh (public) nằm trong `src/`
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Import routes
const route = require('./src/routes/index.route'); 
route(app);

// Khởi chạy server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
