
var express = require('express');
var router = express.Router();
var UserInfoExport = require('../../model/user-info')


router.get('/', function(req,res){
    res.json({'message':"Connected to Circadian Rhythm Buddy API v1"})
});

router.post('/userinfo', function(req, res){
    if (typeof req.body.age    === 'undefined') return res.status(400).json({'success':false, 'message':'Must include age in POST request.'});
    if (typeof req.body.gender === 'undefined') return res.status(400).json({'success':false, 'message':'Must include gender in POST request.'});
    if (typeof req.body.wake   === 'undefined') return res.status(400).json({'success':false, 'message':'Must include wake in POST request.'});
    if (typeof req.body.sleep  === 'undefined') return res.status(400).json({'success':false, 'message':'Must include sleep in POST request.'});

    let intAge = Number(req.body.age);
    if (isNaN(intAge)) return res.status(400).json({'success':false, 'message':'age must be integer in POST request.'});

    intAge = Math.floor(intAge); // Make integer

    // Put into db
    UserInfoExport.UserInfo.deleteMany({}, function(err){
        if (err) return res.status(500).json({success: false, message:'Could not save to database'});
        UserInfoExport.UserInfo.create({
            records: req.body
        }, function(err){
            if (err) res.status(500).json({success: false, message:'Could not save to database'});
            else res.json({'success':true, 'message':"Successfully saved."})
        });
    });
});

router.get('/activities', function(req,res){

});

module.exports = router;