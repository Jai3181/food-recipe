const { check, validationResult } = require("express-validator")

exports.validateSignuprequest = [
  check('userName').notEmpty().withMessage("username is required"),
  check('email').isEmail().withMessage("valid email is required"),
  check('password').isLength({ min: 5 }).withMessage("valid password is required")
]

exports.validateSigninrequest = [
  check('email').isEmail().withMessage("valid email is required"),
  check('password').isLength({ min: 5 }).withMessage("valid password is required"),
]

exports.isRequestvalidated = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
  next()
}