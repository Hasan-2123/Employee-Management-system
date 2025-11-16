const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  address: { type: String },
  photoUrl: { type: String } // store relative path or URL
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);