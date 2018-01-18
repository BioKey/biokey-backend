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
    defaultThreshold: Number
});

module.exports = mongoose.model('Organization', organizationSchema);