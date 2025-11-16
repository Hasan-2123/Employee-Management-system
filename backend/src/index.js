require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // parse JSON

// routes
app.use('/api/employees', require('./routes/employees'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
