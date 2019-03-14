

const hr_max =  (age) => {
    return 217 - (0.85 * age);
}

const max_vo2 =  (hr_rest, age) => {
    hrmax = hr_max(age);
    return 15 * (hrmax / hr_rest)
}

const deter_intensity = async (hr_rates) => {
    let cr_rhythm = await estimate_cr(hr_rates.x, hr_rates.y);
    
    if(cr_rhythm >= 0.7){
        return "high"
    }
    else if(cr_rhythm < 0.7 && cr_rhythm > 0.4){
        return "medium"
    }
    else{
        return "low"
    }
}

const estimate_cr = async(x, y) => {
    var dx = await diff(x);
    var dy = await diff(y);
    
    if(x.length !== y.length){
        throw Error("Size of array X and Y must be equal")
    }

    var result = [];
    for (var i = 0; i < dx.length; i++){
        result.push(dy[i]/dx[i]);
    }

    return result;
}

const diff = async (a_list) => {
    var res = []
    for (var i = 0; i < a_list.length-1; i++){
        res.push(a_list[i+1] - a_list[i])
    }
    return res
}

module.exports = {
    estimate_cr,
    deter_intensity
}