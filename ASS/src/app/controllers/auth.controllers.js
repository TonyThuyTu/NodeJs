class AuthController {
    logout(req, res) {
      res.clearCookie("token"); // Xóa cookie chứa token đăng nhập
      res.redirect("/"); // Chuyển hướng về trang chủ
    }
  }
  
  module.exports = new AuthController();
  