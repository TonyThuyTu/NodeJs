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
}

module.exports = new UserController();
