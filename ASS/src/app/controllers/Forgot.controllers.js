const User = require("../models/user"); // Model user
const nodemailer = require("nodemailer");

class UserForgot {
    index(req, res) {
        res.render("auth/forgotpass", { title: "Forgot Password" });
    }

    async sendResetLink(req, res) {
        const { email } = req.body;

        try {
            // Kiểm tra email có tồn tại trong DB không
            const user = await User.findOne({ email });
            if (!user) {
                console.log(`❌ Email không tồn tại: ${email}`);
                return res.render("auth/forgotpass", {
                    title: "Forgot Password",
                    errorMessage: "Email not found. Please enter a valid email.",
                });
            }

            // Thiết lập transporter để gửi email
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "tunlhpd09942@gmail.com",  // Thay bằng email của bạn
                    pass: "nahe tvfn iohe dtya", // Thay bằng mật khẩu hoặc App Password
                },
            });

            // Nội dung email
            const mailOptions = {
                from: "tonynguyen@gmail.com",
                to: email,
                subject: "Reset Your Password",
                text: `Xin chào ${user.username},\n\nMật khẩu của bạn là: ${user.password}\n\n Vui lòng hãy nhấn đường link trên và thay đổi mật khẩu!`,
            };

            // Gửi email
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email đã gửi thành công đến: ${email}`);

            // Hiển thị thông báo thành công
            res.render("auth/forgotpass", {
                title: "Forgot Password",
                successMessage: "An email with your password has been sent!",
            });

        } catch (error) {
            console.error(`❌ Lỗi khi gửi email:`, error);
            res.render("auth/forgotpass", {
                title: "Forgot Password",
                errorMessage: "Something went wrong. Please try again.",
            });
        }
    }
}

module.exports = new UserForgot();
