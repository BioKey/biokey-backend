var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
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

machineSchema.plugin(mongoosePaginate);

/**
 * Hook to ensure referential integrity.
 */
machineSchema.pre('remove', function(next) {
    TypingProfile.remove({machine: this._id}).exec();
    next();
});

module.exports = mongoose.model('Machine', machineSchema);