var mongoose = require("mongoose");


var UserHRSchema = new mongoose.Schema({

    activities: {
        timestamp:{
            type:Number,
            required: true
        },
        heart_rate:{
            type:Number,
            required: true
        },
        activity: {
            type: String, 
            default: null
        }
    },
    _id:  {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

var UserHRHistory = mongoose.model('UserHRHistory', UserHRSchema);

module.exports = {UserHRHistory};