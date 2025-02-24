const express = require("express");
const router = express.Router();
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    editPostForm 
} = require("../app/controllers/post.controller");
router.get("/", getAllPosts);
router.get("/create", (req, res) => {
    res.render("post/create", { title: "Tạo bài viết" });
});
router.get("/edit/:id", editPostForm);
// Route `/posts/:id` phải đặt sau cùng
router.get("/:id", getPostById);    
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
