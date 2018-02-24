const Activity = require('../models/activity');

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
const determineOrigin = function (changer, changee_id) {
  if (changer.isAdmin) return 'ADMIN';
  if (changer._id == changee_id) return 'CLIENT';
  else return 'INVALID';
}

const sendUserActivity = function () {
  // TODO: implement
}

/**
 * Saves a successful update to the database.
 * Depending on the origin of the update, alerts the client or the administrator.
 * @
 * @param {String} origin   The origin of the update
 * @param {Object} old      The old object
 * @param {Object} updated  The updated object
 * @return {Boolean}        Returns the success/failure of the saved activity and the alert
 */
const sendTypingProfileActivity = function (origin, old, updated) {
  
  // TODO: determine the kind of update!
  var activityType = 'placeholder';

  // TODO: create new activity
  let newActivity = {
    timestamp: Date.now(),
    typingProfile: old._id,
    activityType: activityType,
    initiatedBy: origin,
    paramaters: {
      sqs: sqsParams('TypingProfile', old, updated),
      admin: { }
    }
  }

  if (origin == 'CLIENT') {
    // TODO: alert the admin
    sendSQS();
  }
  else if (origin == 'ADMIN') {
    // TODO: enqueue an SQS job for the client
    sendAdminAlert();
  }
}

const sqsParams = function (changeType, old, updated) {
  return {
    QueueUrl: old.endpoint,
    MessageGroupId: old._id+"",
    MessageBody: JSON.stringify(updated),
    MessageAttributes: {
      "ChangeType": {
        DataType: "String",
        StringValue: changeType
      },
      "Timestamp": {
        DataType: "Number",
        StringValue: Date.now()+""
      }
    }
  }
}

const sendAdminAlert = function () {
  // TODO: 
  console.log('Alerting the admin!');
}

const sendSQS = function () {
  // TODO: implement
  console.log('Alerting the client!');
}

/**
 * Function to send a "User"-type message to the client.
 */
/*
var sendUserMessage = function(user, typingProfile){

	console.log("Sending a user message!");
	
	let sendParams = {
		QueueUrl: typingProfile.endpoint,
		MessageGroupId: typingProfile._id+"",
		MessageBody: JSON.stringify(user),
		MessageAttributes: {
			"ChangeType": {
				DataType: "String",
				StringValue: "User"
			},
			"Timestamp": {
				DataType: "Number",
				StringValue: Date.now()+""
			}
		}
	}

	//Send updated typing profile to SQS
	sqs.sendMessage(sendParams, function(err, sent) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Success", sent.MessageId);
		}
	});
}
*/

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