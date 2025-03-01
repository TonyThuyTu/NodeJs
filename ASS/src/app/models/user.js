const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// ✅ Kiểm tra model trước khi tạo lại (tránh OverwriteModelError)
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
