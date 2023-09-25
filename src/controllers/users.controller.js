const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")

async function register(req, res) {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user)
      return res
        .status(404)
        .json({ error: "User with this email already exists" })

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    })
    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "There was an error registering user" })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.status(404).json({ error: "User does not exist" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password

    res.status(200).json({ token, user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "There was an error logging in user" })
  }
}

module.exports = { register, login }
