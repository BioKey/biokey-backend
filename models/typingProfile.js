var mongoose = require('mongoose');
var AWS = require('aws-sdk');
AWS.config.update({ "region": process.env.AWS_REGION });

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var isLockedUpdated = false; //ASSUMPTION: this will be the only thing that could possibly change.

var createParams = {
    Attributes: {
        'FifoQueue': "true",
        'ReceiveMessageWaitTimeSeconds': "1",
        'ContentBasedDeduplication': "false"
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
    lastHeartbeat: Number,
    tensorFlowModel: {
        type: mongoose.Schema.Types.Mixed
    },
    endpoint: {
        type: String,
        require: true
    },
    challengeStrategies: [String],
    threshold: [Number]
});

typingProfileSchema.index({ user: 1, machine: 1 }, { unique: true }); // ASSUMPTION: user-machine pairs should be unique

/**
 * Create the SQS server and endpoint.
 */
typingProfileSchema.post('save', function(doc, next) {

    // Check if endpoint has already been set.
    if (!!doc.endpoint) return next();

    createParams.QueueName = doc._id + ".fifo";
    sqs.createQueue(createParams, function(err, data) {
        if (err) {
          console.log("Error", err);
          return next();
        } else {
          doc.endpoint = data.QueueUrl;
          doc.save(err => {
              if (err) console.log(err);
              next();
          });
        }
    });
});

module.exports = mongoose.model('TypingProfile', typingProfileSchema);