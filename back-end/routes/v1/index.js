
var express = require('express');
var router = express.Router();
var UserInfoExport = require('../../model/user-info');
var UserTopicCount = require('../../model/user-topic-count');

var recomEngine = require('../../recomm-engine/engine');


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

router.get('/activities', async function(req,res){
    if (typeof req.query.lat === 'undefined') return res.status(400).json({'success':false, 'message':'Must include lat in GET request.'});
    if (typeof req.query.lon === 'undefined') return res.status(400).json({'success':false, 'message':'Must include lon in GET request.'});

    
    let heart_rates = {
        x : [1,3,4,6,7,8],
        y : [1,2,4,2,3,1] 
    };
    let activities = await recomEngine.search_activities(heart_rates, "2019-03-17T15:00:00", "33.6295", "-117.8684" );
    console.log(activities);
    res.json(activities);
});

router.post('/activities/:guid', function(req, res){
    res.status(200).json({'success':true, 'message':`Event ID ${req.params.guid} has been selected`});

    setImmediate(async()=>{
        try {
            let activity = await recomEngine.search_by_id(req.params.guid);
            let assetTopics = activity.assetTopics;
    
            assetTopics.forEach(elem => {
                UserTopicCount.UserTopicCount.findOneAndUpdate({topic_name:elem.topic.topicName}, 
                    {$inc:{count: 1}},
                {upsert: true}).exec();
            });
        } catch (err){
            //Do nothing
        }
        
    }); 
})

module.exports = router;