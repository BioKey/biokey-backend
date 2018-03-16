var mongoose = require('mongoose');
var TypingProfile = require('./typingProfile');

var machineSchema = mongoose.Schema({
    mac: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: ('Organization'),
        require: true
    }
});

/**
 * Hook to ensure referential integrity.
 */
machineSchema.pre('remove', function(next) {
    TypingProfile.remove({machine: this._id}).exec();
    next();
});

module.exports = mongoose.model('Machine', machineSchema);