// Generic request validator using JOI

module.exports = (schema) => {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((d) => d.message)
      });
    }

    req.body = value;
    next();
  };
};
