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
        enum: ['LOCKED', 'UNLOCKED', 'INFO', 'OFFLINE', 'ONLINE'], // Add more here
        require: true
    },
    initiatedBy: {
        type: String,
        enum: ['CLIENT', 'SERVER'],
        require: true
    },
    parameters: {
        type: mongoose.Schema.Types.Mixed,
        require: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);