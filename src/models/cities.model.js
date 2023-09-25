const mongoose = require("mongoose")

const citiesSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
    require: true,
  },
  cityName: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  emoji: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  notes: String,
  position: {
    type: Map,
    of: String,
    require: true,
  },
})

module.exports = mongoose.model("City", citiesSchema)
