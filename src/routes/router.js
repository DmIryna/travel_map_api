const express = require("express")
const router = express.Router()

const {
  getAllCities,
  getCurrentCity,
  createCity,
  removeCity,
} = require("../controllers/cities.controller")
const { register, login } = require("../controllers/users.controller")
const { cityValidation } = require("../validations")

router.get("/:userId/cities", getAllCities)
router.get("/:userId/cities/:id", getCurrentCity)
router.post("/:userId/cities", cityValidation, createCity)
router.delete("/:userId/cities/:id", removeCity)

router.post("/register", register)
router.post("/login", login)

module.exports = router
