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
    defaultChallengeStrategies: {
        type: Array,
        default: ['GoogleAuth', 'TextMessage']
    }
});

module.exports = mongoose.model('Organization', organizationSchema);