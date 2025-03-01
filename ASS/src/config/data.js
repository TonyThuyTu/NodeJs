const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/ASS"; // DB đang sử dụng là "ASS"
 // Đảm bảo đúng địa chỉ

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Đã kết nối MongoDB!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
