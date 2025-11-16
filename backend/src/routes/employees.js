const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee
} = require('../controllers/employeeController');

// multer setup: save to src/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'src/uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() +  '-' +  path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// CRUD
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', upload.single('photo'), createEmployee);
router.put('/:id', upload.single('photo'), updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;