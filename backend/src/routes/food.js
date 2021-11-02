const express = require("express")
const { createDish, getDish } = require("../controller/food")
const { requireSignin } = require("../common-middlewares");
const multer = require("multer")
const shortid = require("shortid")
const path = require("path")
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/createFood', requireSignin, upload.array('foodPicture'), createDish)
router.get('/getFood', getDish)

module.exports = router;