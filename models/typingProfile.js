var mongoose = require('mongoose');

var typingProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: ('User'),
        require: true
    },
    machine: {
        type: mongoose.Schema.ObjectId, 
        ref: ('Machine'),
        require: true
    },
    authStatus: {
        type: Boolean,
        require: true,
        default: false
    },
    lockStatus: {
        type: Boolean,
        require: true,
        default: false
    },
    accessToken: {
        type: String,
        trim: true,
        require: true
    },
    tensorFlowModel: {
        type: String,
        trim: true,
        require: true
    },
    endpoint: {
        type: String,
        required: true
      }
});

typingProfileSchema.index({user: 1, machine: 1}, {unique: true});   // ASSUMPTION: user-machine pairs should be unique

module.exports = mongoose.model('TypingProfile', typingProfileSchema);