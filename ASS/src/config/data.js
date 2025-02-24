const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://localhost:27017/ASS";
const client = new MongoClient(MONGO_URI);

let db = null; // Biến lưu kết nối DB

// ✅ Kết nối đến MongoDB
const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("ASS"); // Chọn database
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1); // Dừng server nếu không kết nối được DB
  }
};

// ✅ Lấy database (chỉ khi đã kết nối)
const getDB = () => {
  if (!db) {
    throw new Error("❌ Database chưa kết nối! Hãy gọi connectDB() trước.");
  }
  return db;
};

// ✅ Đóng kết nối MongoDB khi cần
const closeDB = async () => {
  try {
    await client.close();
    console.log("🚪 Đã đóng kết nối MongoDB.");
  } catch (error) {
    console.error("❌ Lỗi khi đóng kết nối MongoDB:", error.message);
  }
};

module.exports = { connectDB, getDB, closeDB };
