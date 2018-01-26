var mongoose = require('mongoose');

var keystrokeSchema = mongoose.Schema({
    character: {
        type: String,
        require: true,
        trim: true
    },
    timestamp: {
        type: Number,
        require: true
    },
    keyDown: {
        type: Boolean,
        require: true
    },
    typingProfile: {type: mongoose.Schema.ObjectId, ref: ('TypingProfile')}
});

module.exports = mongoose.model('Keystroke', keystrokeSchema);