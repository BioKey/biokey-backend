const Activity = require('../models/activity');
const Organization = require('../models/organization');
const User = require('../models/user');
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
  if (changer.isAdmin && changer._id != changee_id) return 'ADMIN';
  if (changer._id == changee_id) return 'CLIENT';
  else return 'INVALID';
}

/**
 * Save a successful User update to the database.
 * Depending on the origin of the update, alerts the client or the administrator.
 * 
 * @param {String} origin                The origin of the update
 * @param {User} old                     The old user
 * @param {User} updated                 The updated user
 * @param {TypingProfile} typingProfile  The TypingProfile associated with the user
 * @param {boolean} passwordUpdated      Whether the password was updated
 */
const sendUserActivity = function(origin, old, updated, typingProfile, passwordUpdated) {
  // Determine the type of activity.
  let activityType;
  if (old.email != updated.email || passwordUpdated) activityType = 'LOGOUT';
  else activityType = 'INFO';

  // Add some user fields to the TypingProfile.
  typingProfile.phoneNumber = updated.phoneNumber;
  typingProfile.googleAuthKey = updated.googleAuthKey;

  let objectType = 'User';

  getAdminPhoneNumbers(updated, function(phoneNumbers) {
    saveAndSendActivity(
      buildActivity(typingProfile._id, activityType, origin, sqsParams(objectType, typingProfile, activityType),
      objectType, phoneNumbers));
  });
}

/**
 * Saves a successful TypingProfile update to the database.
 * Depending on the origin of the update, alerts the client or the administrator.
 * 
 * @param {String} origin          The origin of the update
 * @param {TypingProfile} old      The old TypingProfile
 * @param {TypingProfile} updated  The updated TypingProfile
 * @param {User} user              The user associated with this typing profile
 * @return {Boolean}               Returns the success/failure of the saved activity and the alert
 */
const sendTypingProfileActivity = function(origin, old, updated, user) {
  // Determine the type of activity.
  let activityType;
  if (old.isLocked != updated.isLocked) {
    if (updated.isLocked) activityType = 'LOCK';
    else activityType = 'UNLOCK';
  } else activityType = 'INFO';

  // Add some user fields to the TypingProfile.
  updated.phoneNumber = user.phoneNumber;
  updated.googleAuthKey = user.googleAuthKey;

  let objectType = 'TypingProfile';

  getAdminPhoneNumbers(user, function(phoneNumbers) {
    saveAndSendActivity(
      buildActivity(updated._id, activityType, origin, sqsParams(objectType, updated, activityType),
      objectType, phoneNumbers));
  });
}

/**
 * A helper function to build, save, and send alerts for activities.
 * 
 * @param {ObjectId} typingProfile  The associated typing profile
 * @param {String} activityType     The type of activity
 * @param {String} origin           The origin of the change that caused the activity
 * @param {Object} sqs              The sqs message object
 */
const buildActivity = function(typingProfileId, activityType, origin, sqs) {
  return {
    timestamp: Date.now(),
    typingProfile: typingProfileId,
    activityType: activityType,
    initiatedBy: origin,
    paramaters: {
      sqs: sqs
    }
  }
}

/**
 * A helper function to save activity and send alerts for its creation.
 * 
 * @param {Object} activity       The activity to save
 * @param {String} objectType     The type of object that was updated
 * @param {Array}  phoneNumbers   The phone numbers to send alert to
 */
const saveAndSendActivity = function(activity, objectType, phoneNumbers) {
  let newActivity = new Activity(activity);
  newActivity.save((err, saved) => {
    if (err) console.log("Activity save err: " + err);
    else {
      console.log("Saved activity: " + saved._id);
      if (activity.initiatedBy == 'ADMIN') {
        // Alert the client.
        sendSQS(activity.paramaters.sqs);
      } else if (activity.initiatedBy == 'CLIENT' && activity.activityType != 'INFO') {
        // Alert the admin.
        sendAdminAlert(objectType, activity.activityType, activity, phoneNumbers);
      }
    }
  });
}

/**
 * Helper function to build SQS requests.
 * 
 * @param {String} objectType     The type of object that was updated
 * @param {Object} updated        The updated typing profile (with additional fields)
 * @param {String} activityType   The type of activity
 */
const sqsParams = function(objectType, updated, activityType) {
  return {
    QueueUrl: updated.endpoint,
    MessageGroupId: updated._id + "",
    MessageDeduplicationId: Date.now().toString(),
    MessageBody: JSON.stringify({
      changeType: activityType,
      typingProfile: JSON.stringify(updated),
      phoneNumber: updated.phoneNumber,
      googleAuthKey: updated.googleAuthKey,
      timeStamp: Date.now().toString()
    }),
    MessageAttributes: {
      "ChangeType": {
        DataType: "String",
        StringValue: objectType
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
  console.log('Sending admin action to the client with id: ' + params.MessageGroupId);
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
 * @param {Array}  phoneNumbers  The phone numbers to send alert to
 */
const sendAdminAlert = function(objectType, activityType, activity, phoneNumbers) {
  if (!phoneNumbers || phoneNumbers.length == 0) return;

  // Text the administrators.
  phoneNumbers.forEach(phoneNumber => {
    twilio.messages.create({
        to: phoneNumber,
        from: process.env.TWILIO_FROM_PHONE_NUMBER,
        body: objectType + " " + activityType + " update!\nOn Typing Profile:\n" + activity.typingProfile,
      }, (err, message) => {
        if (err) console.log("Could not send text to " + phoneNumber);
        console.log("Sent text to regarding activity " + activity._id + " to " + phoneNumber);
      });
  });
}

/**
 * A helper function to get the admins of the user's organization.
 * 
 * @param {Object} user     The user who owns the object
 * @param {Function} nextF  The function to call with the phoneNumbers
 * @return {Array}          The array of admin numbers
 */
const getAdminPhoneNumbers = function(user, nextF) {
  let phoneNumbers = [];
  User.find({ 'organization': user.organization, 'isAdmin': true }, (err, admins) => {
    if (err || admins.length == 0) nextF(phoneNumbers);
    else admins.forEach(admin => {
      phoneNumbers.push(admin.phoneNumber);
    });
    nextF(phoneNumbers);
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
  checkOrigin: determineOrigin,
  send: {
    activity: {
      typingProfile: sendTypingProfileActivity,
      user: sendUserActivity
    }
  }
};