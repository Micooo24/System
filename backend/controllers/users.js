const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'yoursecretkey',
      { expiresIn: '1d' }
    );
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// // Get all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update a user
// exports.updateUser = async (req, res) => {
//   try {
//     const { username, email } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { username, email },
//       { new: true }
//     ).select('-password');
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json({ message: 'User updated', user });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete a user
// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };