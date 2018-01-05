var mongoose = require('mongoose');

var organizationSchema = mongoose.Schema({
    name: {
        type: String, 
        unique: true,
        trim: true,
        require: true
    },
    maxUsers: {
        type: Number,
        require: true
    },
    challengeStrategies: [String],
    defaultThreshold: {
        type: Number,
        defualt: 50 // PLACEHOLDER
    }
});

module.exports = mongoose.model('Organization', organizationSchema);