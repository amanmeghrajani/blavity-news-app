const express = import("express")
const app = express()
const bodyParser = require("body-parser")
const routes = require('./routes')

/* Middleware to parse incoming json */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


app.use(routes)
app.start(5000)