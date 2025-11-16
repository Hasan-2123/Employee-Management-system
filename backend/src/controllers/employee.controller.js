const employeeService = require("../services/employee.service");

exports.getEmployees = async (req, res) => {
  try {
    const list = await employeeService.getAllEmployeesService();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
