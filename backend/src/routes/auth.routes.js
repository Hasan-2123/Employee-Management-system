const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

router.post("/login", validate(loginSchema), controller.login);

module.exports = router;
