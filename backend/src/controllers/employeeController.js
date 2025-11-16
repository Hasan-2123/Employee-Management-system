const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');

// helper to remove old photo
const deletePhoto = (photoUrl) => {
  if (!photoUrl) return;
  const p = path.join(__dirname, '..', photoUrl.replace(/^\//, ''));
  if (fs.existsSync(p)) fs.unlinkSync(p);
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Not found' });
    res.json(employee);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, age, email, dateOfBirth, address } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const emp = new Employee({
      name, age: age ? Number(age) : undefined, email,
      dateOfBirth: dateOfBirth || undefined,
      address, photoUrl
    });
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Not found' });

    const { name, age, email, dateOfBirth, address } = req.body;
    if (req.file) {
      // delete previous photo
      deletePhoto(emp.photoUrl);
      emp.photoUrl = `/uploads/${req.file.filename}`;
    }
    if (name !== undefined) emp.name = name;
    if (age !== undefined) emp.age = Number(age);
    if (email !== undefined) emp.email = email;
    if (dateOfBirth !== undefined) emp.dateOfBirth = dateOfBirth;
    if (address !== undefined) emp.address = address;

    await emp.save();
    res.json(emp);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Not found' });

    deletePhoto(emp.photoUrl);

    await Employee.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
