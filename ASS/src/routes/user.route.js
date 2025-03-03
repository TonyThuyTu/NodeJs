const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/user.controller");
const PostController = require("../app/controllers/post.controller");
const authMiddleware = require("../app/middleware/authMiddleware");
const upload = require("../app/middleware/uploadMiddleware");

// ✅ Hiển thị trang cá nhân (Danh sách bài viết)
router.get("/", authMiddleware, UserController.profile);

// ✅ Thêm bài viết mới
router.post("/", authMiddleware, upload.single("image"), PostController.createPost);

// ✅ Hiển thị form chỉnh sửa bài viết
router.get("/posts/edit/:id", authMiddleware, PostController.editPostForm);

// ✅ Cập nhật bài viết (Dùng PUT thay vì POST)
router.put("/update/:id", authMiddleware, upload.single("image"), PostController.updatePost);

// ✅ Xóa bài viết (Dùng DELETE)
router.delete("/posts/:id", authMiddleware, PostController.deletePost);

module.exports = router;
