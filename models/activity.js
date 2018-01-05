var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
    timestamp: {
        type: Number,
        require: true
    },
    typingProfile: {
        type: mongoose.Schema.ObjectId, 
        ref: ('TypingProfile'),
        require: true
    },
    activityType: {
        type: mongoose.Schema.ObjectId, 
        ref: ('ActivityType'),
        require: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);