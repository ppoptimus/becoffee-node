const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const PushMessageMulticast = require("./pushMessageMulticast")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	res.send("Connected");
})

app.post("/pushmulticast", (req, res) => {
	PushMessageMulticast(req, res)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log("Application is running on port: " + port)
})