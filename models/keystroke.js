var mongoose = require('mongoose');

var keystrokeSchema = mongoose.Schema({
    character: {
        type: String,
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

module.exports = mongoose.model('Keystroke', keystrokeSchema);