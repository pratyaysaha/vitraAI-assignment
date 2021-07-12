const express = require("express")
const people = require("./data/people")

const app = express()
app.use(express.json())
app.use(express.static(__dirname + "/css"))
app.use(express.static(__dirname + "/js"))
app.use(express.static(__dirname + "/data"))
app.set("view engine", "ejs")

app.get("", (req, res) => {
	res.render("page1")
})
app.get("/page2", (req, res) => {
	res.render("page2")
})
app.listen(3000 || process.env.PORT)
