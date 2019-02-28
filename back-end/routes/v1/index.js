
var express = require('express');
var router = express.Router();


router.get('/', function(req,res){
    res.json({'message':"Connected to Circadian Rhythm Buddy API v1"})
});

module.exports = router;