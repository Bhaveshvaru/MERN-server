const { check, validationResult } = require('express-validator');
module.exports.validateSignupRequest = [
  check('firstname').notEmpty().withMessage('firstname is required'),
  check('lastname').notEmpty().withMessage('lastname is required'),
  check('email').notEmpty().withMessage('Valid Email is required'),
  check('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports.validateSigninRequest = [
  check('email').notEmpty().withMessage('Valid Email is required'),
  check('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0],
    });
  }
  next();
};
