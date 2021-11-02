const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  reciepe: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  time_required: {
    type: String,
    required: true,
    trim: true,
  },
  ingridiants: [
    {
      name: String,
      quantity: String
    }
  ],
  foodPictures: [
    {
      img: {
        type: String
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true })


module.exports = mongoose.model('Food', foodSchema)