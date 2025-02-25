const User = require("../models/user");

exports.create = (req, res) => {
    res.render('userCreate', { title: 'Create User' });
};

exports.store = (req, res) => {
    console.log(req.body);
    res.send("User created successfully!");
};

exports.show = (req, res) => {
    const userId = req.params.id;
    res.render('userDetail', { title: `User ${userId}`, userId });
};

// Tạo user mới
exports.createUser = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const newUser = new User({ name, phone, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
