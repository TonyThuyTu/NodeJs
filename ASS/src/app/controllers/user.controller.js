class UserController {
  profile(req, res) {
    if (!req.user) {
      return res.redirect("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang login
    }

    res.render("profile", { title: "Profile", user: req.user });
  }
}

module.exports = new UserController();
