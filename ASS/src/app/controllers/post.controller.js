const { getDB } = require("../../config/data");
const { ObjectId } = require("mongodb");
const Post = require("../models/post");

class PostController {
    list(req, res) {
        res.json("post/index", { title: "All Posts" });
    }

    detail(req, res) {
        const postId = req.params.id;
        res.render("postDetail", { title: `Post ${postId}`, postId });
    }
}

const postController = new PostController();

// API CRUD

// ✅ Lấy danh sách tất cả bài viết
const getAllPosts = async (req, res) => {
    try {
        const db = getDB(); 
        const posts = await Post.findAll(db); // Gọi hàm `findAll(db)`
        
        console.log("📌 Danh sách bài viết:", posts); // Kiểm tra kết quả

        res.render("post/index", { posts, title: "Danh sách bài viết" });
    } catch (error) {
        console.error("🚨 Lỗi khi lấy danh sách bài viết:", error);
        res.status(500).send("Lỗi khi lấy danh sách bài viết");
    }
};


// ✅ Thêm bài viết mới
const createPost = async (req, res) => {
    try {
        const db = getDB(); // Lấy kết nối MongoDB

        // Kiểm tra dữ liệu đầu vào
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: "Tiêu đề và nội dung không được để trống" });
        }

        const newPost = {
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date()
        };

        // Thêm bài viết vào database
        const result = await db.collection("posts").insertOne(newPost);

        console.log("📌 Bài viết mới:", result.insertedId);
        res.redirect("/posts");
        // res.status(201).json({ message: "Thêm bài viết thành công!", postId: result.insertedId });

    } catch (error) {
        console.error("🚨 Lỗi khi thêm bài viết:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// ✅ Lấy bài viết theo ID
const getPostById = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const post = await Post.findById(db, id);
        if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Hiển thị form chỉnh sửa bài viết
const editPostForm = async (req, res) => {
    try {
        const db = getDB();
        let { id } = req.params;

        console.log("📌 ID nhận được:", id);

        // ✅ Kiểm tra ID hợp lệ
        if (!ObjectId.isValid(id)) {
            console.log("❌ ID không hợp lệ!");
            return res.status(400).send("ID không hợp lệ");
        }

        const post = await Post.findById(db, new ObjectId(id));
        if (!post) {
            console.log("❌ Bài viết không tồn tại!");
            return res.status(404).send("Bài viết không tồn tại");
        }

        res.render("post/edit", { post });
    } catch (error) {
        console.error("🚨 Lỗi server:", error);
        res.status(500).send("Lỗi server");
    }
};

// ✅ Cập nhật bài viết theo ID
const updatePost = async (req, res) => {
    try {
        const db = getDB(); 
        let { id } = req.params;

        // ✅ Kiểm tra ID hợp lệ
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("ID không hợp lệ");
        }

        const result = await Post.update(db, new ObjectId(id), req.body);
        if (result.matchedCount === 0) {
            return res.status(404).send("Bài viết không tồn tại");
        }

        console.log("✅ Cập nhật thành công, chuyển hướng...");
        res.redirect("/posts");
    } catch (error) {
        console.error("🚨 Lỗi cập nhật bài viết:", error);
        res.status(500).send("Lỗi server");
    }
};

// ✅ Xóa bài viết theo ID
const deletePost = async (req, res) => {
    try {
        const db = getDB(); 
        let { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send("ID không hợp lệ");
        }

        await Post.delete(db, new ObjectId(id));
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Export đúng cách
module.exports = { 
    postController,
    getAllPosts, 
    createPost, 
    getPostById, 
    updatePost, 
    deletePost, 
    editPostForm
};
