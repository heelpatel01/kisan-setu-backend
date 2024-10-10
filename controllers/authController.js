const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return user data without password
    const { password: _, ...userData } = user._doc; // Exclude password field
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Return user data without password
    const { password: _, ...userData } = user._doc; // Exclude password field
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
