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
    defaultChallengeStrategies: {
        type: Array,
        default: ['GoogleAuth', 'TextMessage']
    }
});

/**
 * Hook to ensure referential integrity.
 */
organizationSchema.pre('remove', function(next) {
    console.log("Removing things associated with" + this._id);
    Machine.remove({organization: this._id}).exec();
    User.remove({organization: this._id}).exec();
    next();
>>>>>>> aa18401a2d804bcfebc022216368519b27c5d1c2
});

module.exports = mongoose.model('Organization', organizationSchema);