var mongoose = require('mongoose');

var organizationSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    maxUsers: {
        type: Number,
        require: true,
        default: 100
    },
    challengeStrategies: [String],
    defaultThreshold: Number
});

module.exports = mongoose.model('Organization', organizationSchema);