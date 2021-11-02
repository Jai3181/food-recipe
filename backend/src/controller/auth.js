const User = require("../models/user")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (user) return res.status(400).json({
        message: "user already exists"
      })

      const { userName, email, password } = req.body;
      const _user = new User({
        userName,
        email,
        password
      })

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "something went wrong while adding user"
          })
        }
        if (data) {
          return res.status(201).json({
            message: "User Created"
          })
        }
      })
    })
}

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (error) {
        res.status(400).json({ error })
      }
      if (user) {
        if (user.authenticate(req.body.password)) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
          const { _id, userName, email } = user
          res.status(200).json({
            token,
            user: {
              _id, userName, email
            }
          })
        }
        else {
          res.status(400).json({
            message: "invalid password"
          })
        }
      }
      else {
        res.status(400).json({
          message: "something went wrong"
        })
      }
    })
}