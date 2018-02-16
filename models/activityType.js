var mongoose = require('mongoose');

var activityTypeSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    importance: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'LOW'
    }
});

module.exports = mongoose.model('ActivityType', activityTypeSchema);