const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
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

app.use(express.static(path.join(__dirname, "..", "..", "/client/public")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "..", "client/dist/index.html"))
)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
