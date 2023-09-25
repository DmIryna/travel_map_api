const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const router = require("./routes/router")

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.log(err))

const app = express()
app.use(express.json())

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use("/", router)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
