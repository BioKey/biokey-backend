var mongoose = require('mongoose');
var AWS = require('aws-sdk');
AWS.config.update({ "region": process.env.AWS_REGION });

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var createParams = {
    Attributes: {
        'FifoQueue': "true",
        'ReceiveMessageWaitTimeSeconds': "1",
        'ContentBasedDeduplication': "true"
    }
};

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
    isLocked: {
        type: Boolean,
        require: true,
        default: false
    },
    lastHeartbeat: Date,
    tensorFlowModel: {
        type: String,
        trim: true
    },
    endpoint: {
        type: String
    },
    challengeStrategies: [String],
    threshold: [Number]
});

typingProfileSchema.index({ user: 1, machine: 1 }, { unique: true }); // ASSUMPTION: user-machine pairs should be unique

//Create SQS server + endpoint
typingProfileSchema.post('save', function(typingProfile, next) {
    
    if(typingProfile.endpoint!=null) next();

    createParams.QueueName = typingProfile._id+".fifo";

    sqs.createQueue(createParams, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success can be found at " + data.QueueUrl);
          typingProfile.endpoint = data.QueueUrl;
          typingProfile.save(function(err, saved){
            if(err) console.log(err);
            else console.log("Typing profile saved successfully! " + saved.endpoint);
            next();
          });
        }
        next();
    });
});

module.exports = mongoose.model('TypingProfile', typingProfileSchema);