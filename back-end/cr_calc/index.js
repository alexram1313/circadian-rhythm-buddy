const AVG_MED = 73;
const AVG_LOW = 63;
const AVG_HIGH= 83;

const FEMALE_SCALE = 1.09589041;

const determine_state = function(hr_data, age, gender){

    let sum = 0;
    let avg = 0;
    let lastRate = hr_data[hr_data.length-1]['heart_rate'];
    for (let i = 0; i < hr_data.length; ++i){
        sum += hr_data[i].heart_rate;
    }
    avg = sum/hr_data.length;

    let offset = avg - AVG_MED;
    let avgMed = AVG_MED+offset;
    let avgLow = AVG_LOW+offset;
    let avgHigh= AVG_HIGH+offset;

    let ageOffset = 0.0324200913 * Math.abs(age-50);

    // 71 = 73 * x * 30

    if (gender == 'male'){
        if (lastRate <= avgLow-ageOffset){
            return 'low';
        } else if (lastRate > avgLow-ageOffset && lastRate <= avgHigh-ageOffset){
            return 'medium';
        } else if (lastRate > avgHigh-ageOffset){
            return 'high';
        }

    } else if (gender == 'female'){
        if (lastRate <= avgLow*FEMALE_SCALE-ageOffset){
            return 'low';
        } else if (lastRate > avgLow*FEMALE_SCALE-ageOffset && lastRate <= avgHigh*FEMALE_SCALE-ageOffset){
            return 'medium';
        } else if (lastRate > avgHigh*FEMALE_SCALE-ageOffset){
            return 'high';
        }
    }

}

module.exports = {determine_state}; 