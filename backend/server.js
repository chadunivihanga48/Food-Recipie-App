const express = require("express")
const app = express()
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 3000

app.use("/recipie", require("./routes/recipie"))

app.listen(PORT, (err) => {
    console.log(`app is listening on port ${PORT}`)
})