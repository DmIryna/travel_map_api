const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
})

module.exports = mongoose.model("User", usersSchema)
