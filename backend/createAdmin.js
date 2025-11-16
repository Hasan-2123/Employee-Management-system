require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",   // bcrypt will hash automatically
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created!");
    process.exit(0);
  })
  .catch((err) => console.log(err));
