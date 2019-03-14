var reqeust = require('request');
var config = require("../config/config");
var credential = require("../config/credential");
const {estimate_cr, deter_intensity} = require("./engine-lib");
const EXERINTENSITYLIB = require('./exer-intensity');

const fs = require('fs');


const search_activities = async (heart_rates, curr_time, lat, lon) => {
    
    let intensity = await deter_intensity(heart_rates);
    
    let topic_names = await _build_topic_name(intensity);
    let qry = await _build_query(lat, lon, topic_names);
    console.log(qry)
    let activities = await _get_activities(qry);

    console.log((activities));
    return activities;
}

const filter_out = async (activities, curr_time) => {
    

}

const _get_active_search_base_url = async() => {
    return config.PROTOCOL+'://'+config.ACTIVE_API_BASE+'/'
    +config.ACTIVE_API_VERSION+'/'+config.ACTIVE_API_SEARCH
}

const _get_activities = async (qry) => {
   
    var baseurl = await _get_active_search_base_url();
    
    return new Promise((resolve, reject) => {
        reqeust({
                url:baseurl,
                qs:qry
            }, (err, response, body) => {
                if(err)
                    reject(err);
            
                var obj = JSON.parse(body);
                resolve(obj.results);
        })});
}

const _build_query = async (lat, long, topic_name, curr_time) => {
    var qry = {
        api_key : credential.API_KEY,
        lat_lon : lat+ ',' +long,
        topicName: topic_name,
        start_date: curr_time
    }
    return qry;
}

const _build_topic_name = async (intensity) => {
    var topics = EXERINTENSITYLIB[intensity];
    var result = "";
    var end = topics.length-1;
    for (var i = 0; i < topics.length-1; i++){
        result += topics[i];
        result += "20%OR";
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
    let heart_rates = {
        x : [1,3,4,6,7,8],
        y : [1,2,4,2,3,1] 
    }
    await search_activities(heart_rates, new Date(), "33.6295", "-117.8684");
}

main();