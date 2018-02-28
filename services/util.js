const Activity = require('../models/activity');
const AWS = require('aws-sdk');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
AWS.config.update({ "region": process.env.AWS_REGION });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

/**
 * Helper function to normalize an error
 * to a standard format for display on the client
 * 
 * @param  {Object} err Error to normalize
 * @return {Object}     Normalized errors
 */
const normalizeError = function(err) {
  let error = { name: 'Error', message: 'Something went wrong... Sorry bout it...' }

  if (err.name && err.message) {
    error.name = err.name;
    error.message = err.message;
  } else if (err.message) {
    error.message = err.message;
  } else if (err.errmsg) {
    let parts = err.errmsg.split(': ')
    error.name = parts[0]
    error.message = parts.slice(1).join(': ')
  }

  return error;
}

/**
 * Helper function to normalize a list of errors
 * to a standard format for display on the client
 * 
 * @param  {Array} errors List of errors to normalize
 * @return {Array}        List of normalized errors
 */
const normalizeErrors = function(errors) {
  if (!errors.isArray) {
    errors = [errors]
  }
  errors = errors.map(normalizeError);
  return { errors }

}

/**
 * Takes a request query and set list of allowed
 * query fields and returns a filtered query object
 * with enabled params.
 * 
 * @param  {Object} query         Request query object
 * @param  {Array} allowedParams  List of allowed query paramaters
 * @return {Object}               Returns filtered query object
 */
const filterQuery = function(query, allowedParams) {
  let newQuery = {};
  allowedParams.forEach(p => {
    if (query[p]) newQuery[p] = query[p]
  });
  return newQuery;
}

/**
 * Determines the origin of the pushed update by looking at involved users.
 * 
 * @param {Object} changer     The user that requested the update
 * @param {String} changee_id  The user who owns the updated object
 * @return {String}            Returns the origin of the change; on of [INVALID, CLIENT, ADMIN]
 */
const determineOrigin = function(changer, changee_id) {
  if (changer.isAdmin) return 'ADMIN';
  if (changer._id == changee_id) return 'CLIENT';
  else return 'INVALID';
}

/**
 * Save a successful User update to the database.
 * Depending on the origin of the update, alerts the client or the administrator.
 * 
 * @param {String} origin                The origin of tfe update
 * @param {User} old                     The old user
 * @param {User} updated                 The updated user
 * @param {TypingProfile} typingProfile  The TypingProfile associated with the user
 */
const sendUserActivity = function(origin, old, updated, typingProfile) {

  //Determine the type of activity
  let activityType;
  if (old.email != updated.email || old.password != updated.password) activityType = 'LOGOUT';
  else activityType = 'INFO';

  buildActivity(activityType, 'User', typingProfile, old, typingProfile, updated, origin);
}

/**
 * Saves a successful TypingProfile update to the database.
 * Depending on the origin of the update, alerts the client or the administrator.
 * 
 * @param {String} origin          The origin of the update
 * @param {TypingProfile} old      The old TypingProfile
 * @param {TypingProfile} updated  The updated TypingProfile
 * @return {Boolean}               Returns the success/failure of the saved activity and the alert
 */
const sendTypingProfileActivity = function(origin, old, updated, user) {

  //Determine the type of activity
  var activityType;
  if (old.isLocked != updated.isLocked) {
    if (updated.isLocked) activityType = 'LOCK';
    else activityType = 'UNLOCK';
  } else var activityType = 'INFO';

  buildActivity(activityType, 'TypingProfile', old, user, old, updated, origin);
}

/**
 * A helper function to build, save, and send alerts for activities.
 * 
 * @param {String} activityType     The type of activity
 * @param {String} objectType       The type of object
 * @param {ObjectId} typingProfile  The associated typing profile
 * @param {Object} old              The old object
 * @param {Object} updated          The updated object
 * @param {String} origin           The origin of the change that caused the activity
 */
const buildActivity = function(activityType, objectType, typingProfile, user, old, updated, origin) {

  let activity = {
    timestamp: Date.now(),
    typingProfile: typingProfile._id,
    activityType: activityType,
    initiatedBy: origin,
    paramaters: {
      sqs: sqsParams(objectType, old, updated, user, activityType)
    }
  }
  console.log("Parameters: " + JSON.stringify(activity.paramaters.sqs));
  let newActivity = new Activity(activity);
  newActivity.save((err, saved) => {
    if (err) console.log("Activity save err: " + err);
    else {
      console.log("Saved activity: " + saved);
      if (origin == 'ADMIN') {
        // Alert the client
        sendSQS(activity.paramaters.sqs);
      } else if (origin == 'CLIENT' && activity.activityType != 'INFO') {
        // Alert the Admin
        sendAdminAlert(objectType, activityType, activity);
      }
    }
  });
}

/**
 * Helper function to build SQS requests.
 * 
 * @param {String} objectType  The type of object that was updated
 * @param {Object} old         The previous version of the object
 * @param {Object} updated     The new version of the object
 */
const sqsParams = function(objectType, old, updated, user, changeType) {
  return {
    QueueUrl: old.endpoint,
    MessageGroupId: old._id + "",
    MessageDeduplicationId: Date.now(),
    MessageBody: JSON.stringify({
      userChangeType: changeType,
      typingProfile: JSON.stringify(updated),
      phoneNumber: user.phoneNumber,
      googleAuthKey: user.googleAuthKey,
      timeStamp: Date.now()
    }),
    MessageAttributes: {
      "ChangeType": {
        DataType: "String",
        StringValue: changeType
      }
    }
  }
}

/**
 * A helper function to send SQS messages.
 * 
 * @param {JSON} params Parameters for the request
 */
const sendSQS = function(params) {
  console.log('Alerting the client!');
  sqs.sendMessage(params, function(err, sent) {
    if (err) {
      console.log("SQS error: " + err);
    } else {
      console.log("Success: " + sent.MessageId);
    }
  });
}

/**
 * A helper function to send admin alerts via Twilio.
 * 
 * @param {String} objectType    The type of the object whose update triggered the activity
 * @param {String} activityType  The type of activity being reported
 * @param {Object} activity      The details of the activity
 */
const sendAdminAlert = function(objectType, activityType, activity) {
  twilio.messages.create({
      to: process.env.TWILIO_TO_PHONE_NUMBER,
      from: process.env.TWILIO_FROM_PHONE_NUMBER,
      body: objectType + " " + activityType + " update!\nProfile:\n" + activity.typingProfile + "\nTimestamp:\n" + activity.timestamp,
    })
    .then(message => {
      console.log("Text sent!");
    });
}

module.exports = {
  norm: {
    error: normalizeError,
    errors: normalizeErrors
  },
  filter: {
    query: filterQuery
  },
  check: determineOrigin,
  send: {
    activity: {
      typingProfile: sendTypingProfileActivity,
      user: sendUserActivity
    }
  }
};