define({ "api": [
  {
    "type": "delete",
    "url": "/api/activities/:id",
    "title": "DeleteActivity",
    "name": "DeleteActivity",
    "description": "<p>Deletes an existing activity within the requesting user's organization given an id. Not implemented because no user should need to delete activities (for recordkeeping purposes).</p>",
    "group": "Activities",
    "version": "0.0.0",
    "filename": "routes/activities.js",
    "groupTitle": "Activities",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/activities/:id",
    "title": "GetActivity",
    "name": "GetActivity",
    "description": "<p>Get the activity within the requesting user's organization given an id.</p>",
    "group": "Activities",
    "version": "0.0.0",
    "filename": "routes/activities.js",
    "groupTitle": "Activities",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "activity",
            "description": "<p>The requested activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activity._id",
            "description": "<p>UUID of the activity for the system</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "activity.timestamp",
            "description": "<p>Time that the activity occurred</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "activity.typingProfile",
            "description": "<p>The typing profile associated with the activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activity.activityType",
            "description": "<p>The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', &quot;NEW_PROFILE&quot;]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avtivity.initatedBy",
            "description": "<p>Who initiated this activity, can be one of ['CLIENT', 'ADMIN']</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"activity\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"typingProfile\": \"5a4c08cd19d0a40d9c051653\",\n     \"activityType\": \"5a4c019629015e0c8b9c1737\",\n     \"timestamp\": 234567,\n     \"initatedBy\": \"Admin\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/activities",
    "title": "ListActivities",
    "name": "ListActivities",
    "description": "<p>Get a list of all activities for the requesting user's organization. The requesting user will not be able to request activities outside of the organization. Can specify the limit, page, and sort for pagination.</p>",
    "group": "Activities",
    "version": "0.0.0",
    "filename": "routes/activities.js",
    "groupTitle": "Activities",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "activities",
            "description": "<p>The requested activities</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activities._id",
            "description": "<p>UUID of the activity for the system</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "activities.timestamp",
            "description": "<p>Time that the activity occurred</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "activities.typingProfile",
            "description": "<p>The typing profile associated with the activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activities.activityType",
            "description": "<p>The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', &quot;NEW_PROFILE&quot;]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avtivity.initatedBy",
            "description": "<p>Who initiated this activity, can be one of ['CLIENT', 'ADMIN']</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"activities\": [\n     {\n       \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n       \"typingProfile\": \"5a4c08cd19d0a40d9c051653\",\n       \"activityType\": \"5a4c019629015e0c8b9c1737\",\n       \"timestamp\": 234567,\n       \"initatedBy\": \"Admin\"\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/activities",
    "title": "PostActivity",
    "name": "PostActivity",
    "description": "<p>Create a new activity within the requesting user's organization. If the user is an admin, they can create an activity associated with any typing profile within their organization. If the requesting user is not an admin, they can only create an activity for themselves.</p>",
    "group": "Activities",
    "version": "0.0.0",
    "filename": "routes/activities.js",
    "groupTitle": "Activities",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "activity",
            "description": "<p>The requested activity</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "activity.timestamp",
            "description": "<p>Time that the activity occurred</p>"
          },
          {
            "group": "Parameter",
            "type": "TypingProfile",
            "optional": false,
            "field": "activity.typingProfile",
            "description": "<p>The typing profile associated with the activity</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activity.activityType",
            "description": "<p>The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', &quot;NEW_PROFILE&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avtivity.initatedBy",
            "description": "<p>Who initiated this activity, can be one of ['CLIENT', 'ADMIN']</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"activity\": {\n     \"typingProfile\": \"5a4c08cd19d0a40d9c051653\",\n     \"activityType\": \"5a4c019629015e0c8b9c1737\",\n     \"timestamp\": 234567,\n     \"initatedBy\": \"Admin\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "activity",
            "description": "<p>The requested activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activity._id",
            "description": "<p>UUID of the activity for the system</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "activity.timestamp",
            "description": "<p>Time that the activity occurred</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "activity.typingProfile",
            "description": "<p>The typing profile associated with the activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activity.activityType",
            "description": "<p>The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', &quot;NEW_PROFILE&quot;]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avtivity.initatedBy",
            "description": "<p>Who initiated this activity, can be one of ['CLIENT', 'ADMIN']</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"activity\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"typingProfile\": \"5a4c08cd19d0a40d9c051653\",\n     \"activityType\": \"5a4c019629015e0c8b9c1737\",\n     \"timestamp\": 234567,\n     \"initatedBy\": \"Admin\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/activities/:id",
    "title": "UpdateActivity",
    "name": "UpdateActivity",
    "description": "<p>Update an existing activity within the requesting user's organization given an id. Not implemented because no user should need to update activities (they should be immutable).</p>",
    "group": "Activities",
    "version": "0.0.0",
    "filename": "routes/activities.js",
    "groupTitle": "Activities",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "activity",
            "description": "<p>The requested activity</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "activity.timestamp",
            "description": "<p>Time that the activity occurred</p>"
          },
          {
            "group": "Parameter",
            "type": "TypingProfile",
            "optional": false,
            "field": "activity.typingProfile",
            "description": "<p>The typing profile associated with the activity</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activity.activityType",
            "description": "<p>The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', &quot;NEW_PROFILE&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avtivity.initatedBy",
            "description": "<p>Who initiated this activity, can be one of ['CLIENT', 'ADMIN']</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"activity\": {\n     \"typingProfile\": \"5a4c08cd19d0a40d9c051653\",\n     \"activityType\": \"5a4c019629015e0c8b9c1737\",\n     \"timestamp\": 234567,\n     \"initatedBy\": \"Admin\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "activity",
            "description": "<p>The requested activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activity._id",
            "description": "<p>UUID of the activity for the system</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "activity.timestamp",
            "description": "<p>Time that the activity occurred</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "activity.typingProfile",
            "description": "<p>The typing profile associated with the activity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activity.activityType",
            "description": "<p>The type of the activity, can be one of ['LOCK', 'UNLOCK', 'INFO', 'LOGOUT', 'LOGIN', &quot;NEW_PROFILE&quot;]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avtivity.initatedBy",
            "description": "<p>Who initiated this activity, can be one of ['CLIENT', 'ADMIN']</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"activity\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"typingProfile\": \"5a4c08cd19d0a40d9c051653\",\n     \"activityType\": \"5a4c019629015e0c8b9c1737\",\n     \"timestamp\": 234567,\n     \"initatedBy\": \"Admin\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/analysisResults/:id",
    "title": "DeleteAnalysisResult",
    "name": "DeleteAnalysisResult",
    "description": "<p>Delete an existing analysis result within the requesting user's organization given an id. Not implemented because no user should be able to delete analysis results (for recordkeeping purposes).</p>",
    "group": "AnalysisResults",
    "version": "0.0.0",
    "filename": "routes/analysisResults.js",
    "groupTitle": "AnalysisResults",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/analysisResults/:id",
    "title": "GetAnalysisResults",
    "name": "GetAnalysisResults",
    "description": "<p>Get the analysis results within the requesting user's organization given an id. Not implemented because no user should need to get individual analysis results (not useful by themselves).</p>",
    "group": "AnalysisResults",
    "version": "0.0.0",
    "filename": "routes/analysisResults.js",
    "groupTitle": "AnalysisResults",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult._id",
            "description": "<p>UUID of of the specific analysis result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.probability",
            "description": "<p>The probability attached to the result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.timestamp",
            "description": "<p>The time that the analysis result was created</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "analysisResults.typingProfile",
            "description": "<p>The typing profile that submitted the analysis results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"analysisResult\": \n   {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"probability\": 0.6,\n     \"timestamp\": 3456732435432,\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }        \n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/analysisResults",
    "title": "ListAnalysisResults",
    "name": "ListAnalysisResults",
    "description": "<p>Get a list of all analysis results for the requesting user's organization. The requesting user will not be able to request results outside of the organization. Can specify the start and end timestamp to look within.</p>",
    "group": "AnalysisResults",
    "version": "0.0.0",
    "filename": "routes/analysisResults.js",
    "groupTitle": "AnalysisResults",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResults._id",
            "description": "<p>UUID of of the specific analysis result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResults.probability",
            "description": "<p>The probability attached to the result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResults.timestamp",
            "description": "<p>The time that the analysis result was created</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "analysisResults.typingProfile",
            "description": "<p>The typing profile that submitted the analysis results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"analysisResults\": [\n     {\n         \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n         \"probability\": 0.6,\n         \"timestamp\": 3456732435432,\n         \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/analysisResults",
    "title": "PostAnalysisResult",
    "name": "PostAnalysisResult",
    "description": "<p>Create a new analysis result within the requesting user's organization. The requesting user can only create an analysis result for themselves.</p>",
    "group": "AnalysisResults",
    "version": "0.0.0",
    "filename": "routes/analysisResults.js",
    "groupTitle": "AnalysisResults",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.probability",
            "description": "<p>The probability attached to the result</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.timestamp",
            "description": "<p>The time that the analysis result was created</p>"
          },
          {
            "group": "Parameter",
            "type": "TypingProfile",
            "optional": false,
            "field": "analysisResults.typingProfile",
            "description": "<p>The typing profile that submitted the analysis results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{  \n     \"analysisResult\" : {\n     \"probability\": 0.6,\n     \"timestamp\": 3456732435432,\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult._id",
            "description": "<p>UUID of of the specific analysis result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.probability",
            "description": "<p>The probability attached to the result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.timestamp",
            "description": "<p>The time that the analysis result was created</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "analysisResults.typingProfile",
            "description": "<p>The typing profile that submitted the analysis results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"analysisResult\": \n   {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"probability\": 0.6,\n     \"timestamp\": 3456732435432,\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }        \n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/analysisResults/:id",
    "title": "UpdateAnalysisResult",
    "name": "UpdateAnalysisResult",
    "description": "<p>Update an existing analysis result within the requesting user's organization given an id. Not implemented because no user should be able to change analysis results (they should be immutable).</p>",
    "group": "AnalysisResults",
    "version": "0.0.0",
    "filename": "routes/analysisResults.js",
    "groupTitle": "AnalysisResults",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.probability",
            "description": "<p>The probability attached to the result</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.timestamp",
            "description": "<p>The time that the analysis result was created</p>"
          },
          {
            "group": "Parameter",
            "type": "TypingProfile",
            "optional": false,
            "field": "analysisResults.typingProfile",
            "description": "<p>The typing profile that submitted the analysis results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{  \n     \"analysisResult\" : {\n     \"probability\": 0.6,\n     \"timestamp\": 3456732435432,\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult._id",
            "description": "<p>UUID of of the specific analysis result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.probability",
            "description": "<p>The probability attached to the result</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "analysisResult.timestamp",
            "description": "<p>The time that the analysis result was created</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "analysisResults.typingProfile",
            "description": "<p>The typing profile that submitted the analysis results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"analysisResult\": \n   {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"probability\": 0.6,\n     \"timestamp\": 3456732435432,\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }        \n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login",
    "name": "Login",
    "description": "<p>End point for users to login. Users are granted a <a href=\"https://jwt.io/\" target=\"_blank\">JSON web token</a> to be used on authenticated network calls.</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>A JSON web token to be used on following requests.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"token\": \"123456789...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "Register",
    "name": "Register",
    "description": "<p>End point for users to register for the system. Users are granted a <a href=\"https://jwt.io/\" target=\"_blank\">JSON web token</a> to be used on authenticated network calls.</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Hosh Weinstein\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>A JSON web token to be used on following requests.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"token\": \"123456789...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/auth/register/:organization_id",
    "title": "Register for Organization",
    "name": "Register_for_Organization",
    "description": "<p>End point for users to register under a particular organization. Users are granted a <a href=\"https://jwt.io/\" target=\"_blank\">JSON web token</a> to be used on authenticated network calls.</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n  \"name\": \"Hosh Weinstein\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>A JSON web token to be used on following requests.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"token\": \"123456789...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/keystrokes/:id",
    "title": "DeleteKeystroke",
    "name": "DeleteKeystroke",
    "description": "<p>Delete an existing analysis result within the requesting user's organization given an id. Not implemented for now because system currently blocks access from sensitive keystroke information.</p>",
    "group": "Keystrokes",
    "version": "0.0.0",
    "filename": "routes/keystrokes.js",
    "groupTitle": "Keystrokes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/keystrokes/:id",
    "title": "GetKeystroke",
    "name": "GetKeystroke",
    "description": "<p>Get the keystrokes within the requesting user's organization given an id. Not implemented for now because system currently blocks access from sensitive keystroke information.</p>",
    "group": "Keystrokes",
    "version": "0.0.0",
    "filename": "routes/keystrokes.js",
    "groupTitle": "Keystrokes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "keystroke",
            "description": "<p>The requested keystroke</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke._id",
            "description": "<p>UUID of the keystroke for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke.character",
            "description": "<p>The key that was pressed/released.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keystroke.timestamp",
            "description": "<p>The time that the keystroke occurred.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke.upOrDown",
            "description": "<p>Specifies whether the key was pressed or released. One of {&quot;U&quot;, &quot;D&quot;}</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "keystroke.typingProfile",
            "description": "<p>The typing profile that submitted the keystoke.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"keystroke\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"character\": \"R\",\n     \"timestamp\": 3456732435432,\n     \"upOrDown\": \"D\",\n     \"typingProfile\": \"bb4fd2d5aa0f2f041258e517\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/keystrokes",
    "title": "ListKeystrokes",
    "name": "ListKeystrokes",
    "description": "<p>Get a list of all keystrokes for the requesting user's organization. The requesting user will not be able to request keystrokes outside of the organization. Not implemented for now because system currently blocks access from sensitive keystroke information.</p>",
    "group": "Keystrokes",
    "version": "0.0.0",
    "filename": "routes/keystrokes.js",
    "groupTitle": "Keystrokes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystrokes._id",
            "description": "<p>UUID of the keystroke for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keystrokes.character",
            "description": "<p>The key that was pressed/released.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keystrokes.timestamp",
            "description": "<p>The time that the keystroke occurred.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "keystrokes.keyDown",
            "description": "<p>Specifies whether the key was pressed or released.</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "keystrokes.typingProfile",
            "description": "<p>The typing profile that submitted the keystoke.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"keystrokes\": [\n     {\n         \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n         \"character\": 11,\n         \"timestamp\": 3456732435432,\n         \"keyDown\": false,\n         \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/keystrokes",
    "title": "PostKeystroke",
    "name": "PostKeystroke",
    "description": "<p>Create new keystrokes within the requesting user's organization. The requesting user can only create a keystrokes for themselves.</p>",
    "group": "Keystrokes",
    "version": "0.0.0",
    "filename": "routes/keystrokes.js",
    "groupTitle": "Keystrokes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keystroke.character",
            "description": "<p>The key that was newly pressed/released.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "keystroke.timestamp",
            "description": "<p>The time that the new keystroke occurred.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keystroke.keyDown",
            "description": "<p>Specifies whether the key was pressed or released.</p>"
          },
          {
            "group": "Parameter",
            "type": "TypingProfile",
            "optional": false,
            "field": "keystroke.typingProfile",
            "description": "<p>The typing profile that submitted the new keystoke.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{  \n  \"keystroke\": {\n     \"character\": \"R\",\n     \"timestamp\": 3456732435432,\n     \"keyDown\": false\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "keystroke",
            "description": "<p>The requested keystroke</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke._id",
            "description": "<p>UUID of the keystroke for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke.character",
            "description": "<p>The key that was pressed/released.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keystroke.timestamp",
            "description": "<p>The time that the keystroke occurred.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke.upOrDown",
            "description": "<p>Specifies whether the key was pressed or released. One of {&quot;U&quot;, &quot;D&quot;}</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "keystroke.typingProfile",
            "description": "<p>The typing profile that submitted the keystoke.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"keystroke\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"character\": \"R\",\n     \"timestamp\": 3456732435432,\n     \"upOrDown\": \"D\",\n     \"typingProfile\": \"bb4fd2d5aa0f2f041258e517\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/keystrokes/:id",
    "title": "UpdateKeystroke",
    "name": "UpdateKeystroke",
    "description": "<p>Update an existing keystroke within the requesting user's organization given an id. Not implemented for now because system currently blocks access from sensitive keystroke information.</p>",
    "group": "Keystrokes",
    "version": "0.0.0",
    "filename": "routes/keystrokes.js",
    "groupTitle": "Keystrokes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keystroke.character",
            "description": "<p>The key that was newly pressed/released.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "keystroke.timestamp",
            "description": "<p>The time that the new keystroke occurred.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keystroke.keyDown",
            "description": "<p>Specifies whether the key was pressed or released.</p>"
          },
          {
            "group": "Parameter",
            "type": "TypingProfile",
            "optional": false,
            "field": "keystroke.typingProfile",
            "description": "<p>The typing profile that submitted the new keystoke.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{  \n  \"keystroke\": {\n     \"character\": \"R\",\n     \"timestamp\": 3456732435432,\n     \"keyDown\": false\n     \"typingProfile\": \"5a4c019629015e0c8b9c1737\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "keystroke",
            "description": "<p>The requested keystroke</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke._id",
            "description": "<p>UUID of the keystroke for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke.character",
            "description": "<p>The key that was pressed/released.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keystroke.timestamp",
            "description": "<p>The time that the keystroke occurred.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keystroke.upOrDown",
            "description": "<p>Specifies whether the key was pressed or released. One of {&quot;U&quot;, &quot;D&quot;}</p>"
          },
          {
            "group": "Success 200",
            "type": "TypingProfile",
            "optional": false,
            "field": "keystroke.typingProfile",
            "description": "<p>The typing profile that submitted the keystoke.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"keystroke\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"character\": \"R\",\n     \"timestamp\": 3456732435432,\n     \"upOrDown\": \"D\",\n     \"typingProfile\": \"bb4fd2d5aa0f2f041258e517\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/machines/:id",
    "title": "DeleteMachine",
    "name": "DeleteMachine",
    "description": "<p>Delete an existing analysis result within the requesting user's organization given an id.</p>",
    "group": "Machines",
    "version": "0.0.0",
    "filename": "routes/machines.js",
    "groupTitle": "Machines",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/machines/:id",
    "title": "GetMachine",
    "name": "GetMachine",
    "description": "<p>Get the machine within the requesting user's organization given an id.</p>",
    "group": "Machines",
    "version": "0.0.0",
    "filename": "routes/machines.js",
    "groupTitle": "Machines",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "machine",
            "description": "<p>The requested machine</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machine._id",
            "description": "<p>UUID of the machine for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machine.mac",
            "description": "<p>The machine's unique MAC address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "machine.organization",
            "description": "<p>The organization that the machine is assigned to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"machine\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"mac\": \"00:0a:95:9d:68:16\",\n     \"organization\": \"5a4fd2d5fb0f2f041278e510\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/machines",
    "title": "ListMachines",
    "name": "ListMachines",
    "description": "<p>Get a list of all machines for the requesting user's organization. The requesting user will not be able to request machines outside of the organization. Can specify the limit, page, and sort for pagination.</p>",
    "group": "Machines",
    "version": "0.0.0",
    "filename": "routes/machines.js",
    "groupTitle": "Machines",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "machines",
            "description": "<p>The requested machine</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machines._id",
            "description": "<p>UUID of the machine for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machines.mac",
            "description": "<p>The machine's unique MAC address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "machine.organization",
            "description": "<p>The organization that the machine is assigned to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"machines\": [\n     {\n         \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n         \"mac\": \"00:0a:95:9d:68:16\",\n         \"organization\": \"5a4fd2d5fb0f2f041278e510\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/machines",
    "title": "PostMachine",
    "name": "PostMachine",
    "description": "<p>Create a new machine within the requesting user's organization.</p>",
    "group": "Machines",
    "version": "0.0.0",
    "filename": "routes/machines.js",
    "groupTitle": "Machines",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "machine.mac",
            "description": "<p>The machine's unique MAC address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "machine.organization",
            "description": "<p>The organization that the machine is assigned to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"machine\": {\n         \"mac\": \"00:0a:95:9d:68:16\",\n         \"organization\": \"5a4fd2d5fb0f2f041278e510\"\n     }\n   \n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "machine",
            "description": "<p>The requested machine</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machine._id",
            "description": "<p>UUID of the machine for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machine.mac",
            "description": "<p>The machine's unique MAC address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "machine.organization",
            "description": "<p>The organization that the machine is assigned to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"machine\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"mac\": \"00:0a:95:9d:68:16\",\n     \"organization\": \"5a4fd2d5fb0f2f041278e510\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/machines/:id",
    "title": "UpdateMachine",
    "name": "UpdateMachine",
    "description": "<p>Update an existing analysis result within the requesting user's organization given an id.</p>",
    "group": "Machines",
    "version": "0.0.0",
    "filename": "routes/machines.js",
    "groupTitle": "Machines",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "machine.mac",
            "description": "<p>The machine's unique MAC address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "machine.organization",
            "description": "<p>The organization that the machine is assigned to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"machine\": {\n         \"mac\": \"00:0a:95:9d:68:16\",\n         \"organization\": \"5a4fd2d5fb0f2f041278e510\"\n     }\n   \n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "machine",
            "description": "<p>The requested machine</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machine._id",
            "description": "<p>UUID of the machine for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "machine.mac",
            "description": "<p>The machine's unique MAC address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "machine.organization",
            "description": "<p>The organization that the machine is assigned to.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"machine\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"mac\": \"00:0a:95:9d:68:16\",\n     \"organization\": \"5a4fd2d5fb0f2f041278e510\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/organizations/:id",
    "title": "DeleteOrganization",
    "name": "DeleteOrganization",
    "description": "<p>Delete an organization given an id. The id parameter must match the requesting user's organization id.</p>",
    "group": "Organizations",
    "version": "0.0.0",
    "filename": "routes/organizations.js",
    "groupTitle": "Organizations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/organizations/:id",
    "title": "GetOrganization",
    "name": "GetOrganization",
    "description": "<p>Get the requesting user's organization as no user should have access to details about other organizations. The id parameter must match the requesting user's organization id.</p>",
    "group": "Organizations",
    "version": "0.0.0",
    "filename": "routes/organizations.js",
    "groupTitle": "Organizations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization._id",
            "description": "<p>UUID of the organization for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization.name",
            "description": "<p>The organization's unique name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "organization.maxUsers",
            "description": "<p>The number of users that the organization may have.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "organization.defaultChallengeStrategies",
            "description": "<p>The default challenge strategies for typing profiles in the organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"organization\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"name\": \"testOrganization\",\n     \"maxUsers\": \"100\",\n     \"defaultChallengeStrategies\": []\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/organizations",
    "title": "ListOrganizations",
    "name": "ListOrganizations",
    "description": "<p>Get the requesting user's organization as no user should have access to details about all organizations.</p>",
    "group": "Organizations",
    "version": "0.0.0",
    "filename": "routes/organizations.js",
    "groupTitle": "Organizations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organizations._id",
            "description": "<p>UUID of the organization for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organizations.name",
            "description": "<p>The organization's unique name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "organizations.maxUsers",
            "description": "<p>The number of users that the organization may have.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "organizations.defaultChallengeStrategies",
            "description": "<p>The default challenge strategies for typing profiles in the organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"organizations\": [\n     {\n       \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n       \"name\": \"testOrganization\",\n       \"maxUsers\": \"100\",\n       \"defaultChallengeStrategies\": []\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/organizations",
    "title": "PostOrganization",
    "name": "PostOrganization",
    "description": "<p>Create a new organization. Not implemented because organizations are created by their founding user instead.</p>",
    "group": "Organizations",
    "version": "0.0.0",
    "filename": "routes/organizations.js",
    "groupTitle": "Organizations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "organization.name",
            "description": "<p>The organization's unique name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "organization.maxUsers",
            "description": "<p>The number of users that the organization may have.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "organization.defaultChallengeStrategies",
            "description": "<p>The default challenge strategies for typing profiles in the organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"organization\": {\n         \"name\": \"testOrganization\",\n         \"maxUsers\": \"100\",\n         \"defaultChallengeStrategies\": []\n     }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization._id",
            "description": "<p>UUID of the organization for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization.name",
            "description": "<p>The organization's unique name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "organization.maxUsers",
            "description": "<p>The number of users that the organization may have.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "organization.defaultChallengeStrategies",
            "description": "<p>The default challenge strategies for typing profiles in the organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"organization\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"name\": \"testOrganization\",\n     \"maxUsers\": \"100\",\n     \"defaultChallengeStrategies\": []\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/organizations/:id",
    "title": "UpdateOrganization",
    "name": "UpdateOrganization",
    "description": "<p>Update an organization given an id. The id parameter must match the requesting user's organization id.</p>",
    "group": "Organizations",
    "version": "0.0.0",
    "filename": "routes/organizations.js",
    "groupTitle": "Organizations",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "organization.name",
            "description": "<p>The organization's unique name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "organization.maxUsers",
            "description": "<p>The number of users that the organization may have.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "organization.defaultChallengeStrategies",
            "description": "<p>The default challenge strategies for typing profiles in the organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"organization\": {\n         \"name\": \"testOrganization\",\n         \"maxUsers\": \"100\",\n         \"defaultChallengeStrategies\": []\n     }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization._id",
            "description": "<p>UUID of the organization for the system.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "organization.name",
            "description": "<p>The organization's unique name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "organization.maxUsers",
            "description": "<p>The number of users that the organization may have.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "organization.defaultChallengeStrategies",
            "description": "<p>The default challenge strategies for typing profiles in the organization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"organization\": {\n     \"_id\": \"5a4fd2d5fb0f2f041278e510\",\n     \"name\": \"testOrganization\",\n     \"maxUsers\": \"100\",\n     \"defaultChallengeStrategies\": []\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/typingProfiles/:id",
    "title": "DeleteTypingProfile",
    "name": "DeleteTypingProfile",
    "description": "<p>Deletes an existing typing profile within the requesting user's organization given an id.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/typingProfiles/:id",
    "title": "GetTypingProfile",
    "name": "GetTypingProfile",
    "description": "<p>Get the typing profile within the requesting user's organization given an id.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "typingProfile.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Success 200",
            "type": "Machine",
            "optional": false,
            "field": "typingProfile.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfile.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "typingProfile.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"typingProfile\": {\n     \"user\": \"bb4fd2d5aa0f2f041258e517\",\n     \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n     \"isLocked\": \"false\",\n     \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n     \"tensorFlowModel\": \"testModelString\",\n     \"endpoint\": \"https://aws.amazon.com\",\n     \"challengeStrategies\": []\n   }\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/typingProfiles",
    "title": "ListTypingProfiles",
    "name": "ListTypingProfiles",
    "description": "<p>Get a list of all typing profiles for the requesting user's organization. The requesting user will not be able to request profiles outside of the organization. Can specify the limit, page, and sort for pagination.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "typingProfiles.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Success 200",
            "type": "Machine",
            "optional": false,
            "field": "typingProfiles.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfiles.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfiles.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfiles.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "typingProfiles.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfiles.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"typingProfiles\": [\n     {\n       \"user\": \"bb4fd2d5aa0f2f041258e517\",\n       \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n       \"isLocked\": \"false\",\n       \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n       \"tensorFlowModel\": \"testModelString\",\n       \"endpoint\": \"https://aws.amazon.com\",\n       \"challengeStrategies\": []\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/typingProfiles/:id/heartbeat",
    "title": "PostHeartBeat",
    "name": "PostHeartbeat",
    "description": "<p>Update the typing profile with the latest heartbeat from the client.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/typingProfiles/machine/:mac",
    "title": "PostMachineTypingProfile",
    "name": "PostMachineTypingProfile",
    "description": "<p>Create a new machine and/or typing profile if they do not exist. If they do, then get the typing profile given a user's token and machine mac.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "typingProfile.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Success 200",
            "type": "Machine",
            "optional": false,
            "field": "typingProfile.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfile.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "typingProfile.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"typingProfile\": {\n     \"user\": \"bb4fd2d5aa0f2f041258e517\",\n     \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n     \"isLocked\": \"false\",\n     \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n     \"tensorFlowModel\": \"testModelString\",\n     \"endpoint\": \"https://aws.amazon.com\",\n     \"challengeStrategies\": []\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/typingProfiles",
    "title": "PostTypingProfile",
    "name": "PostTypingProfile",
    "description": "<p>Create a new typing profile within the requesting user's organization. If the user is an admin, they can create a typing profile associated with any user within their organization. If the requesting user is not an admin, they can only create an typing profile for themselves. Also creates an activity that the user created a typing profile. Also alerts the admin through text message that the user created a typing profile.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "typingProfile.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Parameter",
            "type": "Machine",
            "optional": false,
            "field": "typingProfile.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfile.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typingProfile.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typingProfile.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "typingProfile.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typingProfile.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"typingProfile\": {\n     \"user\": \"bb4fd2d5aa0f2f041258e517\",\n     \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n     \"isLocked\": \"false\",\n     \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n     \"tensorFlowModel\": \"testModelString\",\n     \"endpoint\": \"https://aws.amazon.com\",\n     \"challengeStrategies\": []\n   }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "typingProfile.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Success 200",
            "type": "Machine",
            "optional": false,
            "field": "typingProfile.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfile.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "typingProfile.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"typingProfile\": {\n     \"user\": \"bb4fd2d5aa0f2f041258e517\",\n     \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n     \"isLocked\": \"false\",\n     \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n     \"tensorFlowModel\": \"testModelString\",\n     \"endpoint\": \"https://aws.amazon.com\",\n     \"challengeStrategies\": []\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/typingProfiles/:id",
    "title": "UpdateTypingProfile",
    "name": "UpdateTypingProfile",
    "description": "<p>Update an existing activity within the requesting user's organization given an id. If specified, can also update a user's phone number and google authentication key. Also creates an activity with the change. If the change was important (lock, unlock), alerts the admin through text message of the change.</p>",
    "group": "TypingProfiles",
    "version": "0.0.0",
    "filename": "routes/typingProfiles.js",
    "groupTitle": "TypingProfiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "typingProfile.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Parameter",
            "type": "Machine",
            "optional": false,
            "field": "typingProfile.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfile.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typingProfile.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typingProfile.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "typingProfile.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typingProfile.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>The user's phone number that was also updated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "googleAuthKey",
            "description": "<p>The user's google authentication key that was also updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"typingProfile\": {\n     \"user\": \"bb4fd2d5aa0f2f041258e517\",\n     \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n     \"isLocked\": \"false\",\n     \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n     \"tensorFlowModel\": \"testModelString\",\n     \"endpoint\": \"https://aws.amazon.com\",\n     \"challengeStrategies\": []\n   }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "typingProfile.user",
            "description": "<p>The user that the typing profile is associated with.</p>"
          },
          {
            "group": "Success 200",
            "type": "Machine",
            "optional": false,
            "field": "typingProfile.machine",
            "description": "<p>The machine that the typing profile is assigned to.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "typingProfile.isLocked",
            "description": "<p>The lock status of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.tensorFlowModel",
            "description": "<p>The tensor flow model of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.endpoint",
            "description": "<p>The sqs endpoint of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "typingProfile.challengeStrategies",
            "description": "<p>The challenge strategies of the typing profile.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typingProfile.lastHeartbeat",
            "description": "<p>The last time the typing profile was checked</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"typingProfile\": {\n     \"user\": \"bb4fd2d5aa0f2f041258e517\",\n     \"machine\": \"bb4fd2d5aa0f2f041258e517\",\n     \"isLocked\": \"false\",\n     \"lastHeartbeat\": \"2020-04-24T11:41:47.280Z\",\n     \"tensorFlowModel\": \"testModelString\",\n     \"endpoint\": \"https://aws.amazon.com\",\n     \"challengeStrategies\": []\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "DeleteUser",
    "name": "DeleteUser",
    "description": "<p>Delete an existing user within the requesting user's organization.</p>",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "GetUser",
    "name": "GetUser",
    "description": "<p>Get the user within the requesting user's organization given an id. If the requesting user is not an admin, they can only get themselves.</p>",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user object being created/updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "user.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>UUID of the activity for the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"user\": {\n    \"_id\": \"5a2c87d5f8de982a759cedf0\",\n    \"name\": \"Hosh Weinstein\",\n    \"email\": \"test@example.com\",\n    \"phoneNumber\": \"519-493-4342\",\n    \"organization\": \"5a4c019629015e0c8b9c1737\",\n    \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n    \"isAdmin\": false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "ListUsers",
    "name": "ListUsers",
    "description": "<p>Get a list of all users for the requesting user's organization. The requesting user will not be able to request users outside of the organization. Can specify the limit, page, and sort for pagination.</p>",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>The users array being created/updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "users.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "users.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users._id",
            "description": "<p>UUID of the activity for the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"users\": [\n     {\n      \"_id\": \"5a2c87d5f8de982a759cedf0\",\n      \"name\": \"Hosh Weinstein\",\n      \"email\": \"test@example.com\",\n      \"phoneNumber\": \"519-493-4342\",\n      \"organization\": \"5a4c019629015e0c8b9c1737\",\n      \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n      \"isAdmin\": false\n     }\n   ] \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/users/me",
    "title": "Me",
    "name": "Me",
    "description": "<p>Gets the authenticated user.</p>",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user object being created/updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "user.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>UUID of the activity for the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"user\": {\n    \"_id\": \"5a2c87d5f8de982a759cedf0\",\n    \"name\": \"Hosh Weinstein\",\n    \"email\": \"test@example.com\",\n    \"phoneNumber\": \"519-493-4342\",\n    \"organization\": \"5a4c019629015e0c8b9c1737\",\n    \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n    \"isAdmin\": false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "PostUser",
    "name": "PostUser",
    "description": "<p>Create a new user within the requesting user's organization.</p>",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "Organization",
            "optional": false,
            "field": "user.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>(Optional) The password to set for the user, optional on put</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "user.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"user\": {\n       \"name\": \"Hosh Weinstein\",\n       \"email\": \"test@example.com\",\n       \"phoneNumber\": \"519-493-4342\",\n       \"organization\": \"5a4c019629015e0c8b9c1737\",\n       \"password\": \"test123\",\n       \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n       \"isAdmin\": false\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user object being created/updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "user.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>UUID of the activity for the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"user\": {\n    \"_id\": \"5a2c87d5f8de982a759cedf0\",\n    \"name\": \"Hosh Weinstein\",\n    \"email\": \"test@example.com\",\n    \"phoneNumber\": \"519-493-4342\",\n    \"organization\": \"5a4c019629015e0c8b9c1737\",\n    \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n    \"isAdmin\": false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized. Only administrators can access.</p>"
          },
          {
            "group": "Errors",
            "type": "text",
            "optional": false,
            "field": "500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/api/users/:id",
    "title": "UpdateUser",
    "name": "UpdateUser",
    "description": "<p>Update a user within the requesting user's organization. Also creates activities for each of the typing profiles owned by the user with this change.</p>",
    "group": "Users",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JSON web token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "Organization",
            "optional": false,
            "field": "user.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>(Optional) The password to set for the user, optional on put</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "user.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"user\": {\n       \"name\": \"Hosh Weinstein\",\n       \"email\": \"test@example.com\",\n       \"phoneNumber\": \"519-493-4342\",\n       \"organization\": \"5a4c019629015e0c8b9c1737\",\n       \"password\": \"test123\",\n       \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n       \"isAdmin\": false\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user object being created/updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>The user's new name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>The user's new email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.phoneNumber",
            "description": "<p>The user's new phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "user.organization",
            "description": "<p>The user's new organization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.googleAuthKey",
            "description": "<p>(Optional) The user's new and unique Google Authentication Key</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.isAdmin",
            "description": "<p>The user's new isAdmin state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>UUID of the activity for the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 200 Success\n{\n  \"user\": {\n    \"_id\": \"5a2c87d5f8de982a759cedf0\",\n    \"name\": \"Hosh Weinstein\",\n    \"email\": \"test@example.com\",\n    \"phoneNumber\": \"519-493-4342\",\n    \"organization\": \"5a4c019629015e0c8b9c1737\",\n    \"googleAuthKey\": \"ejrerjkferjkfnerf\",\n    \"isAdmin\": false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access.</p>"
          }
        ]
      }
    }
  }
] });
