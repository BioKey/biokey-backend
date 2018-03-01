const http = require('http');

const TypingProfile = require('../controllers/typingProfiles');
const User = require('../controllers/users');
const util = require('../services/util');

function saveTypingProfile(req, res) {
    // Construct typingProfile request
    let typingProfileReq = req;
    typingProfileReq.params.id = req.body.typingProfile._id;

    TypingProfile.update(typingProfileReq, res, true, req);
}


exports.post = function(req, res) {
    saveTypingProfile(req, res);
}