var mongoose = require('mongoose');

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

module.exports = mongoose.model('Machine', machineSchema);