const Joi = require("joi");

exports.createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
  }),

  age: Joi.number().integer().min(1).max(100).optional(),

  dateOfBirth: Joi.date().optional(),

  address: Joi.string().max(200).optional()
});

exports.updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().integer().min(1).max(100).optional(),
  dateOfBirth: Joi.date().optional(),
  address: Joi.string().max(200).optional()
});
