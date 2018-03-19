var mongoose = require('mongoose');

var analysisResultSchema = mongoose.Schema({
    probability: {
        type: Number,
        require: true,
        trim: true
    },
    timestamp: {
        type: Number,
        min: 0,
        require: true
    },
    typingProfile: {
        type: mongoose.Schema.ObjectId,
        ref: ('TypingProfile'),
        require: true
    }
});

analysisResultSchema.index({ timestamp: -1});

module.exports = mongoose.model('AnalysisResult', analysisResultSchema);