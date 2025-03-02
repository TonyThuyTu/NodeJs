

class editUser {
    getUser(req, res) {
      if (!req.user) {
        return res.redirect("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang login
      }
  
      res.render("edituser", { title: "Edit Form" });
    }

    

}

module.exports = new editUser();