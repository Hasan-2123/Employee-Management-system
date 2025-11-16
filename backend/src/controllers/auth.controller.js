const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = generateToken(user);

    res.json({
      message: "Login success",
      token,
      user: { id: user._id, role: user.role, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
