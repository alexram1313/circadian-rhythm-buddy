var reqeust = require('request');
var config = require("../config/config");
var credential = require("../config/credential");
const {estimate_cr, deter_intensity, active_request} = require("./engine-lib");
const EXERINTENSITYLIB = require('./exer-intensity');

var UserInfo = require('../model/user-info');
var TopicCount = require('../model/user-topic-count');

const fs = require('fs');


const search_activities = async (heart_rates, curr_time, lat, lon) => {
    
    let intensity = await deter_intensity(heart_rates);
    
    let topic_names = await _build_topic_name(intensity);

    let results = await UserInfo.UserInfo.find({}).exec();
    let qry;
    if (results.length){
        qry = await _build_query(lat, lon, topic_names, curr_time, results[0].records.gender);        
    } else {
        qry = await _build_query(lat, lon, topic_names, curr_time);
    }

    console.log(qry)
    let activities = await _get_activities(qry);

    // Basic Ranking based on previous choices
    let topics = await TopicCount.UserTopicCount.find().exec();
    if (topics.length){
        let scores = {};
        topics.forEach(element=>{
            scores[element.topic_name] = element.count
        });

        for (let i = 0; i < activities.length; ++i){
            let assetTopics = activities[i].assetTopics;
            let score = 0;
            for (let j = 0; j < assetTopics.length; ++j){
                if (scores.hasOwnProperty(assetTopics[j].topic.topicName)){
                    score += scores[assetTopics[j].topic.topicName];
                }
            }

            activities[i]['score'] = score;
        }

        activities.sort((a,b)=>{return b.score - a.score});
    }
    
    return activities;
}

const filter_out = async (activities, curr_time) => {
    

}

const _get_active_search_base_url = async() => {
    return config.PROTOCOL+'://'+config.ACTIVE_API_BASE+'/'
    +config.ACTIVE_API_VERSION+'/'+config.ACTIVE_API_SEARCH+'/';
}

const _get_activities = async (qry) => {
   
    var baseurl = await _get_active_search_base_url();
    
    return new Promise((resolve, reject) => {
        reqeust(baseurl+'?'+qry, (err, response, body) => {
            if(err)
                reject(err);
        
            
            var obj = JSON.parse(body);
            resolve(obj.results);
        })
    });
}

const _build_query = async (lat, long, topic_name, curr_time, gender) => {
    return `api_key=${credential.API_KEY}&lat_lon=${lat+ ',' +long}&topic=${topic_name}&start_date=${curr_time + '..'}&attributes=gender:all${(typeof gender !=='undefined')?' OR gender:'+gender : ''}`;
}

const _build_topic_name = async (intensity) => {
    var topics = EXERINTENSITYLIB[intensity];
    var result = "";
    var end = topics.length-1;
    for (var i = 0; i < topics.length-1; i++){
        result += topics[i];
        result += "%20OR%20";
    }
    result += topics[end];
    return result
}



const main = async () => {
    //var x = [1,3,4,6,7,8]
    //var y = [1,2,4,2,3,1]    
    //var dydx = await estimate_cr(x, y)

    //await get_activities()

    //var test = await _build_topic_name('low');
    //console.log(test)
    //console.log(recommend(0.4))
    //console.log(recommend(0.6))
    //console.log(recommend(0.7))
    
    // cr estimae 
    // build qry
    // makeerquest 

   
    //console.log(qry);
    //get_activities(qry);

    TopicCount.UserTopicCount.findOneAndUpdate({topic_name:'Sailing'}, 
        {$inc:{count: 1}},
    {upsert: true}).exec();

    let heart_rates = {
        x : [1,3,4,6,7,8],
        y : [1,2,4,2,3,1] 
    }
    await search_activities(heart_rates, "2019-03-17T15:00:00", "33.6295", "-117.8684", );
}

main();

module.exports = {
    search_activities
};