const Cities = require("../models/cities.model")
const Users = require("../models/users.model")

const DEFAULT_CITY_ID = 0

const getLatestId = async () => {
  const latest = await Cities.findOne().sort("-id")
  if (!latest) return DEFAULT_CITY_ID

  return latest.id
}

const createCity = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await Users.findById(userId)
    const cityId = (await getLatestId()) + 1
    const newCity = new Cities({
      userId: user.id,
      id: cityId,
      cityName: req.body.cityName,
      country: req.body.country,
      emoji: req.body.emoji,
      date: req.body.date,
      notes: req.body.notes,
      position: req.body.position,
    })

    const savedCity = await newCity.save()
    res.status(201).json(savedCity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "There is an error creating city" })
  }
}

const getCurrentCity = async (req, res) => {
  try {
    const cityId = req.params.id
    const city = await Cities.findOne({ id: cityId })
    res.status(200).json(city)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "City not found" })
  }
}

const getAllCities = async (req, res) => {
  try {
    const { userId } = req.params
    const cities = await Cities.find({ userId: userId }, { _id: 0, __v: 0 })
    res.status(200).json(cities)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: "There was an error fetching cities",
    })
  }
}

const removeCity = async (req, res) => {
  try {
    const cityId = req.params.id
    const existed = await Cities.findOne({ id: cityId })

    if (!existed) return res.status(404).json({ error: "City not found" })

    await Cities.findOneAndDelete({
      id: cityId,
    })

    res.status(200).json({
      message: "City was successfully deleted",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "There was an error removing city" })
  }
}

module.exports = { getCurrentCity, getAllCities, createCity, removeCity }
