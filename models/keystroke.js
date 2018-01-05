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
    upOrDown: {
        type: String,
        require: true,
        trim: true,
        enum: ['U', 'D']
    },
    typingProfile: {type: mongoose.Schema.ObjectId, ref: ('TypingProfile')}
});

module.exports = mongoose.model('Keystroke', keystrokeSchema);