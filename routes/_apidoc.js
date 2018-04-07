/**
 * @apiDefine UnauthorizedError
 * 
 * @apiError (Error 401) Unauthorized Only authenticated users can access.
 */

/**
 * @apiDefine GrantTokenSuccess
 * 
 * @apiSuccess {String} token  A JSON web token to be used on following requests.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "token": "123456789..."
 *     }
 */

/**
 * @apiDefine UserRequestBody
 * 
 * @apiParam {String} user.name The user's new name
 * @apiParam {String} user.email The user's new email
 * @apiParam {String} user.phoneNumber The user's new phone number
 * @apiParam {Organization} user.organization The user's new organization
 * @apiParam {String} user.password (Optional) The password to set for the user, optional on put
 * @apiParam {String} user.googleAuthKey (Optional) The user's new and unique Google Authentication Key
 * @apiParam {Boolean} user.isAdmin The user's new isAdmin state
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *         "user": {
 *            "name": "Hosh Weinstein",
 *            "email": "test@example.com",
 *            "phoneNumber": "519-493-4342",
 *            "organization": "5a4c019629015e0c8b9c1737",
 *            "password": "test123",
 *            "googleAuthKey": "ejrerjkferjkfnerf",
 *            "isAdmin": false
 *        }
 *     }
 */

/**
 * @apiDefine UserSuccess
 *
 * @apiSuccess {Object} user The user object being created/updated
 * @apiSuccess {String} user.name The user's new name
 * @apiSuccess {String} user.email The user's new email
 * @apiSuccess {String} user.phoneNumber The user's new phone number
 * @apiSuccess {Organization} user.organization The user's new organization
 * @apiSuccess {String} user.googleAuthKey (Optional) The user's new and unique Google Authentication Key
 * @apiSuccess {Boolean} user.isAdmin The user's new isAdmin state
 * @apiSuccess {String} user._id UUID of the activity for the system
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "user": {
 *         "_id": "5a2c87d5f8de982a759cedf0",
 *         "name": "Hosh Weinstein",
 *         "email": "test@example.com",
 *         "phoneNumber": "519-493-4342",
 *         "organization": "5a4c019629015e0c8b9c1737",
 *         "googleAuthKey": "ejrerjkferjkfnerf",
 *         "isAdmin": false
 *       }
 *     }
 */

/**
 * @apiDefine UsersSuccess
 *
 * @apiSuccess {Array} users The users array being created/updated
 * @apiSuccess {String} users.name The user's new name
 * @apiSuccess {String} users.email The user's new email
 * @apiSuccess {String} users.phoneNumber The user's new phone number
 * @apiSuccess {Organization} users.organization The user's new organization
 * @apiSuccess {String} users.googleAuthKey (Optional) The user's new and unique Google Authentication Key
 * @apiSuccess {Boolean} users.isAdmin The user's new isAdmin state
 * @apiSuccess {String} users._id UUID of the activity for the system
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "users": [
 *          {
 *           "_id": "5a2c87d5f8de982a759cedf0",
 *           "name": "Hosh Weinstein",
 *           "email": "test@example.com",
 *           "phoneNumber": "519-493-4342",
 *           "organization": "5a4c019629015e0c8b9c1737",
 *           "googleAuthKey": "ejrerjkferjkfnerf",
 *           "isAdmin": false
 *          }
 *        ] 
 *     }
 */

/**
 * @apiDefine ActivityRequestBody
 * 
 * @apiParam {Object} activity The requested activity
 * @apiParam {Number} activity.timestamp Time that the activity occurred
 * @apiParam {TypingProfile} activity.typingProfile The typing profile associated with the activity
 * @apiParam {String} activity.activityType The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', "NEW_PROFILE"]
 * @apiParam {String} avtivity.initatedBy Who initiated this activity, can be one of ['CLIENT', 'ADMIN']
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "activity": {
 *          "typingProfile": "5a4c08cd19d0a40d9c051653",
 *          "activityType": "5a4c019629015e0c8b9c1737",
 *          "timestamp": 234567,
 *          "initatedBy": "Admin"
 *        }
 *     }
 */

/**
 * @apiDefine ActivitySuccess
 *
 * @apiSuccess {Object} activity The requested activity
 * @apiSuccess {String} activity._id UUID of the activity for the system
 * @apiSuccess {Number} activity.timestamp Time that the activity occurred
 * @apiSuccess {TypingProfile} activity.typingProfile The typing profile associated with the activity
 * @apiSuccess {String} activity.activityType The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', "NEW_PROFILE"]
 * @apiSuccess {String} avtivity.initatedBy Who initiated this activity, can be one of ['CLIENT', 'ADMIN']
 *
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "activity": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "typingProfile": "5a4c08cd19d0a40d9c051653",
 *          "activityType": "5a4c019629015e0c8b9c1737",
 *          "timestamp": 234567,
 *          "initatedBy": "Admin"
 *        }
 *     }
 */

 /**
 * @apiDefine ActivitiesSuccess
 *
 * @apiSuccess {Array} activities The requested activities
 * @apiSuccess {String} activities._id UUID of the activity for the system
 * @apiSuccess {Number} activities.timestamp Time that the activity occurred
 * @apiSuccess {TypingProfile} activities.typingProfile The typing profile associated with the activity
 * @apiSuccess {String} activities.activityType The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', "NEW_PROFILE"]
 * @apiSuccess {String} avtivity.initatedBy Who initiated this activity, can be one of ['CLIENT', 'ADMIN']
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "activities": [
 *          {
 *            "_id": "5a4fd2d5fb0f2f041278e510",
 *            "typingProfile": "5a4c08cd19d0a40d9c051653",
 *            "activityType": "5a4c019629015e0c8b9c1737",
 *            "timestamp": 234567,
 *            "initatedBy": "Admin"
 *          }
 *       ]
 *     }
 */

/**
 * @apiDefine AnalysisResultRequestBody
 * 
 * @apiParam {Number} analysisResult.probability The probability attached to the result
 * @apiParam {Number} analysisResult.timestamp The time that the analysis result was created
 * @apiParam {TypingProfile} analysisResults.typingProfile The typing profile that submitted the analysis results
 *
 * @apiParamExample {json} Request-Example:
 *     {  
 *          "analysisResult" : {
 *          "probability": 0.6,
 *          "timestamp": 3456732435432,
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *        }
 *     }
 *      
 */

/**
 * @apiDefine AnalysisResultSuccess
 * 
 * @apiSuccess {Number} analysisResult._id UUID of of the specific analysis result 
 * @apiSuccess {Number} analysisResult.probability The probability attached to the result
 * @apiSuccess {Number} analysisResult.timestamp The time that the analysis result was created
 * @apiSuccess {TypingProfile} analysisResults.typingProfile The typing profile that submitted the analysis results
 *
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "analysisResult": 
 *        {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "probability": 0.6,
 *          "timestamp": 3456732435432,
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *        }        
 *      }      
 */

/**
 * @apiDefine AnalysisResultsSuccess
 * 
 * @apiSuccess {Number} analysisResults._id UUID of of the specific analysis result 
 * @apiSuccess {Number} analysisResults.probability The probability attached to the result
 * @apiSuccess {Number} analysisResults.timestamp The time that the analysis result was created
 * @apiSuccess {TypingProfile} analysisResults.typingProfile The typing profile that submitted the analysis results
 *
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "analysisResults": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "probability": 0.6,
 *              "timestamp": 3456732435432,
 *              "typingProfile": "5a4c019629015e0c8b9c1737"
 *          }
 *        ]
 *      }     
 */

/**
 * @apiDefine KeystrokeRequestBody
 * 
 * @apiParam {String} keystroke.character The key that was newly pressed/released.
 * @apiParam {Number} keystroke.timestamp The time that the new keystroke occurred.
 * @apiParam {Boolean} keystroke.keyDown Specifies whether the key was pressed or released.
 * @apiParam {TypingProfile} keystroke.typingProfile The typing profile that submitted the new keystoke.
 *
 * @apiParamExample {json} Request-Example:
 *     {  
 *       "keystroke": {
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "keyDown": false
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *        }
 *      }
 */

/**
 * @apiDefine KeystrokeSuccess
 *
 * @apiSuccess {Object} keystroke The requested keystroke
 * @apiSuccess {String} keystroke._id UUID of the keystroke for the system.
 * @apiSuccess {String} keystroke.character The key that was pressed/released.
 * @apiSuccess {Number} keystroke.timestamp The time that the keystroke occurred.
 * @apiSuccess {String} keystroke.upOrDown Specifies whether the key was pressed or released. One of {"U", "D"}
 * @apiSuccess {TypingProfile} keystroke.typingProfile The typing profile that submitted the keystoke.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "keystroke": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "upOrDown": "D",
 *          "typingProfile": "bb4fd2d5aa0f2f041258e517"
 *        }
 *      }
 */

/**
 * @apiDefine KeystrokesSuccess
 *
 * @apiSuccess {String} keystrokes._id UUID of the keystroke for the system.
 * @apiSuccess {Number} keystrokes.character The key that was pressed/released.
 * @apiSuccess {Number} keystrokes.timestamp The time that the keystroke occurred.
 * @apiSuccess {Boolean} keystrokes.keyDown Specifies whether the key was pressed or released.
 * @apiSuccess {TypingProfile} keystrokes.typingProfile The typing profile that submitted the keystoke.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "keystrokes": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "character": 11,
 *              "timestamp": 3456732435432,
 *              "keyDown": false,
 *              "typingProfile": "5a4c019629015e0c8b9c1737"
 *          }
 *        ]
 *      }
 *
 */
 
/**
 * @apiDefine MachineRequestBody
 * 
 * @apiParam {String} machine.mac The machine's unique MAC address.
 * @apiParam {String} machine.organization The organization that the machine is assigned to.
 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "machine": {
 *              "mac": "00:0a:95:9d:68:16",
 *              "organization": "5a4fd2d5fb0f2f041278e510"
 *          }
 *        
 *      }
 */

/**
 * @apiDefine MachineSuccess
 * @apiSuccess {Object} machine The requested machine
 * @apiSuccess {String} machine._id UUID of the machine for the system.
 * @apiSuccess {String} machine.mac The machine's unique MAC address.
 * @apiSuccess {Organization} machine.organization The organization that the machine is assigned to.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "machine": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "mac": "00:0a:95:9d:68:16",
 *          "organization": "5a4fd2d5fb0f2f041278e510"
 *        }
 *      }
 */

 /**
 * @apiDefine MachinesSuccess
 * @apiSuccess {Array} machines The requested machine
 * @apiSuccess {String} machines._id UUID of the machine for the system.
 * @apiSuccess {String} machines.mac The machine's unique MAC address.
 * @apiSuccess {Organization} machine.organization The organization that the machine is assigned to.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "machines": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "mac": "00:0a:95:9d:68:16",
 *              "organization": "5a4fd2d5fb0f2f041278e510"
 *          }
 *        ]
 *      }
 */

/**
 * @apiDefine OrganizationRequestBody
 * 
 * @apiParam {String} organization.name The organization's unique name.
 * @apiParam {Number} organization.maxUsers The number of users that the organization may have.
 * @apiParam {Array} organization.defaultChallengeStrategies The default challenge strategies for typing profiles in the organization.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "organization": {
 *              "name": "testOrganization",
 *              "maxUsers": "100",
 *              "defaultChallengeStrategies": []
 *          }
 *      }
 */

/**
 * @apiDefine OrganizationSuccess
 * @apiSuccess {String} organization._id UUID of the organization for the system.
 * @apiSuccess {String} organization.name The organization's unique name.
 * @apiSuccess {Number} organization.maxUsers The number of users that the organization may have.
 * @apiSuccess {Array} organization.defaultChallengeStrategies The default challenge strategies for typing profiles in the organization.
 *
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "organization": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "name": "testOrganization",
 *          "maxUsers": "100",
 *          "defaultChallengeStrategies": []
 *        }
 *     }
 */

 /**
 * @apiDefine OrganizationsSuccess
 * @apiSuccess {String} organizations._id UUID of the organization for the system.
 * @apiSuccess {String} organizations.name The organization's unique name.
 * @apiSuccess {Number} organizations.maxUsers The number of users that the organization may have.
 * @apiSuccess {Array} organizations.defaultChallengeStrategies The default challenge strategies for typing profiles in the organization.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "organizations": [
 *          {
 *            "_id": "5a4fd2d5fb0f2f041278e510",
 *            "name": "testOrganization",
 *            "maxUsers": "100",
 *            "defaultChallengeStrategies": []
 *          }
 *        ]
 *      }
 */

/**
 * @apiDefine TypingProfileRequestBody
 * @apiParam {User} typingProfile.user The user that the typing profile is associated with.
 * @apiParam {Machine} typingProfile.machine The machine that the typing profile is assigned to.
 * @apiParam {Boolean} typingProfile.isLocked The lock status of the typing profile.
 * @apiParam {String} typingProfile.tensorFlowModel The tensor flow model of the typing profile.
 * @apiParam {String} typingProfile.endpoint The sqs endpoint of the typing profile.
 * @apiParam {Array} typingProfile.challengeStrategies The challenge strategies of the typing profile.
 * @apiParam {String} typingProfile.lastHeartbeat The last time the typing profile was checked.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "typingProfile": {
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "isLocked": "false",
 *          "lastHeartbeat": "2020-04-24T11:41:47.280Z",
 *          "tensorFlowModel": "testModelString",
 *          "endpoint": "https://aws.amazon.com",
 *          "challengeStrategies": []
 *        }
 *      }
 */

 /**
 * @apiDefine TypingProfileAndUserRequestBody
 * @apiParam {User} typingProfile.user The user that the typing profile is associated with.
 * @apiParam {Machine} typingProfile.machine The machine that the typing profile is assigned to.
 * @apiParam {Boolean} typingProfile.isLocked The lock status of the typing profile.
 * @apiParam {String} typingProfile.tensorFlowModel The tensor flow model of the typing profile.
 * @apiParam {String} typingProfile.endpoint The sqs endpoint of the typing profile.
 * @apiParam {Array} typingProfile.challengeStrategies The challenge strategies of the typing profile.
 * @apiParam {String} typingProfile.lastHeartbeat The last time the typing profile was checked.
 * @apiParam {String} phoneNumber The user's phone number that was also updated.
 * @apiParam {String} googleAuthKey The user's google authentication key that was also updated.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "typingProfile": {
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "isLocked": "false",
 *          "lastHeartbeat": "2020-04-24T11:41:47.280Z",
 *          "tensorFlowModel": "testModelString",
 *          "endpoint": "https://aws.amazon.com",
 *          "challengeStrategies": []
 *        }
 *      }
 */

/**
 * @apiDefine TypingProfileSuccess
 *
 * @apiSuccess {User} typingProfile.user The user that the typing profile is associated with.
 * @apiSuccess {Machine} typingProfile.machine The machine that the typing profile is assigned to.
 * @apiSuccess {Boolean} typingProfile.isLocked The lock status of the typing profile.
 * @apiSuccess {String} typingProfile.tensorFlowModel The tensor flow model of the typing profile.
 * @apiSuccess {String} typingProfile.endpoint The sqs endpoint of the typing profile.
 * @apiSuccess {Array} typingProfile.challengeStrategies The challenge strategies of the typing profile.
 * @apiSuccess {String} typingProfile.lastHeartbeat The last time the typing profile was checked
 * 
 * @apiSuccessExample Request (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "typingProfile": {
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "isLocked": "false",
 *          "lastHeartbeat": "2020-04-24T11:41:47.280Z",
 *          "tensorFlowModel": "testModelString",
 *          "endpoint": "https://aws.amazon.com",
 *          "challengeStrategies": []
 *        }
 *      }
 */

 /**
 * @apiDefine TypingProfilesSuccess
 *
 * @apiSuccess {User} typingProfiles.user The user that the typing profile is associated with.
 * @apiSuccess {Machine} typingProfiles.machine The machine that the typing profile is assigned to.
 * @apiSuccess {Boolean} typingProfiles.isLocked The lock status of the typing profile.
 * @apiSuccess {String} typingProfiles.tensorFlowModel The tensor flow model of the typing profile.
 * @apiSuccess {String} typingProfiles.endpoint The sqs endpoint of the typing profile.
 * @apiSuccess {Array} typingProfiles.challengeStrategies The challenge strategies of the typing profile.
 * @apiSuccess {String} typingProfiles.lastHeartbeat The last time the typing profile was checked
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "typingProfiles": [
 *          {
 *            "user": "bb4fd2d5aa0f2f041258e517",
 *            "machine": "bb4fd2d5aa0f2f041258e517",
 *            "isLocked": "false",
 *            "lastHeartbeat": "2020-04-24T11:41:47.280Z",
 *            "tensorFlowModel": "testModelString",
 *            "endpoint": "https://aws.amazon.com",
 *            "challengeStrategies": []
 *          }
 *        ]
 *      }
 */

 /**
  * @apiDefine AdminError
  * @apiError (Errors) {text} 401 Unauthorized. Only administrators can access.
  * @apiError (Errors) {text} 500 Internal server error.
  */

 /**
  * @apiDefine RequestHeaders
  * @apiHeader {String} authorization A valid JSON web token
  */