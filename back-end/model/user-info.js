var mongoose = require("mongoose");
const credential = require('../config/credential');

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
    }
})
mongoose.connect(`mongodb://${credential.MONGO_USER}:${credential.MONGO_PASS}@ds117866.mlab.com:17866/circadian`, {useNewUrlParser: true});
var UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = {UserInfo};