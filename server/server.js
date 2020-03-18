require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require('path');

/* Middleware to parse incoming json */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
   
    next()
})
app.use(express.static(path.join(__dirname, 'client/build')));


const routes = require('./routes')
//api routes
app.use("/api", routes)
//everything else with return client
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(8080)