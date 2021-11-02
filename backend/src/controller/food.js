const Food = require("../models/food")

exports.createDish = (req, res) => {
  console.log("reqqqqqqqqqqq", req.files)
  const { dishName, description, category, time_required, ingridiants, reciepe } = req.body
  // console.log(ingridiants, JSON.parse(ingridiants))
  let foodPictures = []
  if (req.files.length > 0) {
    foodPictures = req.files.map(file => {
      return { img: process.env.APP_API + "/public/" + file.filename }
    })
  }
  // console.log("foodPictures", foodPictures)

  const food = new Food({
    dishName,
    description,
    reciepe,
    category,
    time_required,
    ingridiants: JSON.parse(ingridiants),
    foodPictures,
    createdBy: req.user._id
  })
  if (req.file) {
    food.test = process.env.API + "/public/" + req.file.filename;
  }
  food.save((errors, food) => {
    if (errors) { return res.status(400).json(errors) }
    if (food) { return res.status(200).json(food) }
  })
}

exports.getDish = (req, res) => {
  Food.find({})
    .exec((errors, food) => {
      if (errors) { return res.status(400).json({ errors }) }
      if (food) { res.status(200).json({ food }) }
    })
}