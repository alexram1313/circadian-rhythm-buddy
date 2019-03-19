var mongoose = require("mongoose");


var UserInfoSchema = new mongoose.Schema({

    records: {
        age:{
            type:Number,
            required: true
        },
        gender: {
            type: String, 
            default: null
        },
        wake: {
            type: Date, 
            default: null
        },
        sleep: { // iso 8601
            type: Date, 
            default: null
        }
    },
    _id:  {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

var UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = {UserInfo};