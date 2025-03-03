const Post = require("../models/post");
const { ObjectId } = require("mongodb");

// ✅ Lấy danh sách bài viết
const getAllPosts = async (req, res) => {
    try {
        console.log("📥 Đang lấy danh sách bài viết...");
        const posts = await Post.find().sort({ createdAt: -1 });
        console.log("✅ Danh sách bài viết:", posts);
        res.render("profile", { posts, title: "Trang Chủ" });
    } catch (error) {
        console.error("🚨 Lỗi khi lấy danh sách bài viết:", error);
        res.status(500).send("Lỗi khi lấy danh sách bài viết");
    }
};

// ✅ Thêm bài viết mới (chỉ ảnh & tiêu đề)
const createPost = async (req, res) => {
    try {
        console.log("📝 Dữ liệu nhận được:", req.body);
        console.log("👤 Người đăng bài:", req.user);

        if (!req.body.title) {
            console.log("⚠️ Tiêu đề không được để trống!");
            return res.status(400).json({ message: "Tiêu đề không được để trống" });
        }

        const imagePath = req.file ? "/img/" + req.file.filename : null;
        console.log("📸 Đường dẫn ảnh:", imagePath);

        const newPost = new Post({
            title: req.body.title,
            image: imagePath,
            userId: req.user._id,
            createdAt: new Date()
        });

        await newPost.save();
        console.log("✅ Bài viết đã được lưu:", newPost);
        res.redirect("/profile");
    } catch (error) {
        console.error("🚨 Lỗi khi thêm bài viết:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// ✅ Lấy bài viết theo ID
const getPostById = async (req, res) => {
    try {
        console.log("🔍 Đang tìm bài viết với ID:", req.params.id);
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log("❌ Không tìm thấy bài viết!");
            return res.status(404).json({ message: "Không tìm thấy bài viết" });
        }
        console.log("✅ Tìm thấy bài viết:", post);
        res.render("postDetail", { title: post.title, post });
    } catch (error) {
        console.error("🚨 Lỗi khi lấy bài viết:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Hiển thị form chỉnh sửa bài viết
const editPostForm = async (req, res) => {
    try {
        let { id } = req.params;
        console.log("✏️ Hiển thị form chỉnh sửa cho bài viết ID:", id);

        if (!ObjectId.isValid(id)) {
            console.log("⚠️ ID không hợp lệ!");
            return res.status(400).send("ID không hợp lệ");
        }

        const post = await Post.findById(id);
        if (!post) {
            console.log("❌ Bài viết không tồn tại!");
            return res.status(404).send("Bài viết không tồn tại");
        }

        console.log("✅ Đã tìm thấy bài viết để chỉnh sửa:", post);
        res.render("editpost", { post, title: "Chỉnh sửa bài viết" });
    } catch (error) {
        console.error("🚨 Lỗi khi hiển thị form chỉnh sửa:", error);
        res.status(500).send("Lỗi server");
    }
};

// ✅ Cập nhật bài viết
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        console.log("🔍 ID bài viết:", id);
        console.log("👤 ID người dùng:", userId);
        console.log("📩 Dữ liệu nhận được:", req.body);
        console.log("📷 File upload:", req.file);

        if (!ObjectId.isValid(id)) {
            console.log("⛔ ID không hợp lệ!");
            return res.status(400).send("ID không hợp lệ");
        }

        const post = await Post.findById(id);
        if (!post) {
            console.log("❌ Không tìm thấy bài viết!");
            return res.status(404).send("Bài viết không tồn tại");
        }

        if (post.userId.toString() !== userId.toString()) {
            console.log("⛔ Không có quyền chỉnh sửa bài viết!");
            return res.status(403).send("Bạn không có quyền chỉnh sửa bài viết này!");
        }

        let updateData = { title: req.body.title || post.title };

        if (req.file) {
            updateData.image = "/img/" + req.file.filename;
            console.log("✅ Cập nhật ảnh:", updateData.image);
        } else {
            updateData.image = post.image;
        }

        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

        console.log("✅ Bài viết sau khi cập nhật:", updatedPost);

        res.redirect("/profile");
    } catch (error) {
        console.error("🚨 Lỗi khi cập nhật bài viết:", error);
        res.status(500).send("Lỗi server");
    }
};


// ✅ Xóa bài viết
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        console.log("🗑️ Đang xóa bài viết ID:", id);

        if (!ObjectId.isValid(id)) {
            console.log("⚠️ ID không hợp lệ!");
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const post = await Post.findOneAndDelete({ _id: id, userId });

        if (!post) {
            console.log("❌ Bài viết không tồn tại hoặc bạn không có quyền xóa!");
            return res.status(404).json({ message: "Bài viết không tồn tại hoặc bạn không có quyền xóa!" });
        }

        console.log("✅ Bài viết đã được xóa thành công:", post);
        res.json({ message: "Xóa bài viết thành công!" });
    } catch (error) {
        console.error("🚨 Lỗi khi xóa bài viết:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    editPostForm
};
