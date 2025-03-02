const Post = require("../models/post");
const path = require("path");
const fs = require("fs");

class UserController {
  async profile(req, res) {
    if (!req.user) {
      return res.redirect("/login");
    }

    try {
      const posts = await Post.find({ userId: req.user._id });

      res.render("profile", {
        title: "Profile",
        user: req.user,
        posts: posts
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi tải bài viết");
    }
  }

  async createPost(req, res) {
    if (!req.user) {
      return res.redirect("/login");
    }

    try {
      const { title } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!title || !image) {
        return res.status(400).send("Vui lòng nhập tiêu đề và chọn ảnh");
      }

      await Post.create({ title, image, userId: req.user._id });

      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi đăng bài");
    }
  }

  async editPost(req, res) {
    if (!req.user) {
      return res.redirect("/login");
    }

    try {
      const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

      if (!post) {
        return res.status(403).send("Không có quyền chỉnh sửa bài viết này");
      }

      post.title = req.body.title || post.title;
      if (req.file) {
        fs.unlinkSync(`./public${post.image}`); // Xóa ảnh cũ nếu có
        post.image = `/uploads/${req.file.filename}`;
      }

      await post.save();
      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi chỉnh sửa bài viết");
    }
  }

  async deletePost(req, res) {
    if (!req.user) {
      return res.redirect("/login");
    }

    try {
      const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

      if (!post) {
        return res.status(403).send("Không có quyền xóa bài viết này");
      }

      fs.unlinkSync(`./public${post.image}`); // Xóa ảnh
      await Post.deleteOne({ _id: post._id });

      res.redirect("/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi xóa bài viết");
    }
  }
}

module.exports = new UserController();
