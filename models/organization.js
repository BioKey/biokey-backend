var mongoose = require('mongoose');
var Machine = require('./machine');
var User = require('./user');

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
    defaultChallengeStrategies: [String]
});

/**
 * Hook to ensure referential integrity.
 */
organizationSchema.pre('remove', function(next) {
    console.log("Removing things associated with" + this._id);
    Machine.remove({organization: this._id}).exec();
    User.remove({organization: this._id}).exec();
    next();
});

module.exports = mongoose.model('Organization', organizationSchema);