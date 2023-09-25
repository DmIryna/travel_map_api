const { body } = require("express-validator")

const cityValidation = [body("date", "Inavalid date").isDate()]

module.exports = { cityValidation }
