var mongoose = require('mongoose');

var keystrokeSchema = mongoose.Schema({
    character: {
        type: Number,
        require: true,
        trim: true
    },
    timestamp: {
        type: Number,
        min: 0,
        require: true
    },
    keyDown: {
        type: Boolean,
        require: true
    },
    typingProfile: {
        type: mongoose.Schema.ObjectId,
        ref: ('TypingProfile'),
        require: true
    }
});

keystrokeSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Keystroke', keystrokeSchema);