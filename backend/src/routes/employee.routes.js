const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/employee.controller");

// Protected route (requires token)
router.get("/", auth, controller.getEmployees);

// CREATE (with validation)
router.post(
  "/",
  upload.single("photo"),
  validate(createEmployeeSchema),
  controller.createEmployee
);

// UPDATE (with validation)
router.put(
  "/:id",
  upload.single("photo"),
  validate(updateEmployeeSchema),
  controller.updateEmployee
);

// DELETE
router.delete("/:id", controller.deleteEmployee);

module.exports = router;
