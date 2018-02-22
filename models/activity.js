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
        type: String,
        enum: ['LOCKED', 'UNLOCKED', 'LOGIN', 'LOGIN'], // Add more here
        require: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);