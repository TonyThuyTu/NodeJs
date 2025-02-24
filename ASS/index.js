const express = require('express');
const { engine } = require('express-handlebars'); // ✅ Đúng cú pháp
const path = require('path');
const { connectDB } = require("./src/config/data");

const app = express();
const port = 3000;

require("dotenv").config();
connectDB();

// ✅ Cấu hình Handlebars đúng cách
app.engine("hbs", engine({
    extname: ".hbs",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,  
        allowProtoMethodsByDefault: true
    }
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/resources/views'));

// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));

// Hỗ trợ DELETE, PUT bằng method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Import routes
const route = require('./src/routes/index.route');
route(app);

// Chạy server
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
