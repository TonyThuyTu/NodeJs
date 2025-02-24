const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv");
const connectDB = require("./config/data");

dotenv.config();
connectDB(); // Kết nối MongoDB

const app = express();

// Cấu hình Handlebars
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Route mặc định để test Handlebars
app.get("/", (req, res) => {
    res.render("pages/home"); // Kiểm tra xem file `home.hbs` có đúng không
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
