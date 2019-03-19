var mongoose = require("mongoose");
const credential = require('../config/credential');

var UserTopicCountSchema = new mongoose.Schema({

    topic_name: {
        type: String, 
        required: true,
    },
    count: {
        type: Number,
        required:true,
    }
})
mongoose.connect(`mongodb://${credential.MONGO_USER}:${credential.MONGO_PASS}@ds117866.mlab.com:17866/circadian`, {useNewUrlParser: true});
var UserTopicCount = mongoose.model('UserTopicCount', UserTopicCountSchema);

module.exports = {UserTopicCount};