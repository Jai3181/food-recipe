const express = require("express");
const env = require("dotenv");
const app = express()
const mongoose = require('mongoose');
const path = require("path")
const cors = require('cors');

mongoose.connect(`mongodb+srv://root:admin@cluster0.pd2lx.mongodb.net/food-recipe?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log(`DATABASE CONNECT to ${process.env.MONGO_DB_DATABASE} with user ${process.env.MONGO_DB_USER} : ${process.env.MONGO_DB_PASSWORD} `)
  });

env.config()

const authRoutes = require("./routes/auth")
const foodRoutes = require("./routes/food")

app.use(express.json())
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")))
app.use("/api", authRoutes)
app.use("/api", foodRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});