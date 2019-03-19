var express = require('express');
var app = express();
require('dotenv').config({path:__dirname + '/.env'});
var bodyParser = require('body-parser');

var routes = require('./routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Set up routes
app.use(express.static('public'));


// Root Endpoint
app.get('/', function(req,res){
    res.status(200).json({message:'Connected to Circadian Rhythm Buddy API'});
});

// Route to controllers
app.use(routes);



//Start Server
var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port
  
    console.log("API listening at http://%s:%s", host, port)
});