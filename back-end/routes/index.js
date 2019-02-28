var express = require('express');
var router = express.Router();

var Version1 = require('./v1');

router.use('/v1', Version1);

module.exports = router;