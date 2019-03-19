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
            type: String, 
            default: null
        },
        sleep: {
            type: String, 
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