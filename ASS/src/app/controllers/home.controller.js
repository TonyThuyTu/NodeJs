const Post = require("../models/post");

class HomeController {
    async index(req, res) {
        try {
            // Lấy bài viết kèm thông tin người dùng (username)
            const posts = await Post.find()
                .sort({ createdAt: -1 })
                .populate("userId", "username"); // Lấy username từ userId

            res.render("home", { 
                title: "Home", 
                posts
            });
        } catch (error) {
            console.error("🚨 Lỗi khi lấy danh sách bài viết:", error);
            res.status(500).send("Lỗi khi tải trang chủ");
        }
    }

    about(req, res) {
        res.render("about", { title: "About Us" });
    }
}

module.exports = new HomeController();
