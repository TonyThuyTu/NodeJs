class Post {
    constructor(_id, title, img) {
      this._id = _id;
      this.title = title;
      this.img = img;
    }
  
    // Thêm bài viết mới
    async save(db) {
      try {
        const result = await db.collection("posts").insertOne({
          title: this.title,
          img: this.img,
        });
        return result;
      } catch (err) {
        console.error("Lỗi khi thêm bài viết:", err);
        throw err;
      }
    }
  
    // Lấy tất cả bài viết
    static async findAll(db) {
      try {
        const docs = await db.collection("posts").find({}).toArray();
        return docs.map((doc) => new Post(doc._id, doc.title, doc.content));
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bài viết:", err);
        throw err;
      }
    }
  
    // Tìm bài viết theo ID
    static async findById(db, id) {
      try {
        const doc = await db.collection("posts").findOne({ _id: id });
        return doc ? new Post(doc._id, doc.title, doc.content) : null;
      } catch (err) {
        console.error("Lỗi khi tìm bài viết:", err);
        throw err;
      }
    }
  
    // Cập nhật bài viết theo ID
    static async update(db, id, updateData) {
      try {
        const result = await db.collection("posts").updateOne(
          { _id: id },
          { $set: updateData }
        );
        return result;
      } catch (err) {
        console.error("Lỗi khi cập nhật bài viết:", err);
        throw err;
      }
    }
  
    // Xóa bài viết theo ID
    static async delete(db, id) {
      try {
        const result = await db.collection("posts").deleteOne({ _id: id });
        return result;
      } catch (err) {
        console.error("Lỗi khi xóa bài viết:", err);
        throw err;
      }
    }
  }
  
  module.exports = Post;
  