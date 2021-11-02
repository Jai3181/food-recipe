const express = require("express")
const router = express.Router()
const { signup, signin } = require("../controller/auth")
const { validateSignuprequest, isRequestvalidated, validateSigninrequest } = require("../validators/auth")


router.post('/signup', validateSignuprequest, isRequestvalidated, signup)
router.post('/signin', validateSigninrequest, isRequestvalidated, signin)

module.exports = router;