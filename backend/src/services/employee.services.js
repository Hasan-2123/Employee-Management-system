const Employee = require("../models/Employee");

exports.createEmployeeService = async (data) => {
  const employee = new Employee(data);
  return await employee.save();
};

exports.getAllEmployeesService = async () => {
  return await Employee.find().sort({ createdAt: -1 });
};

exports.deleteEmployeeService = async (id) => {
  return await Employee.findByIdAndDelete(id);
};