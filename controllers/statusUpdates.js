const TypingProfile = require('../controllers/typingProfiles');
const User = require('../controllers/users');
const util = require('../services/util');

exports.post = function(req, res) {

    // Make sure request is valid
    if (!req.body.typingProfile || !req.body.phoneNumber || !req.body.googleAuthKey)
        return res.status(500).send(util.norm.errors({ message: 'Invalid request' }))

    // Construct typingProfile request
    let typingProfileReq = req;
    typingProfileReq.params.id = req.body.typingProfile._id;
    
    TypingProfile.update(typingProfileReq, res2, function(err2) {
        if (err2 || !res2.typingProfile) return res2.status(500).send(util.norm.errors(err2)); 
        
        // Construct user request
        let userReq = req;
        userReq.params.id = req.body.typingProfile.user;
        userReq.body = {
            phoneNumber: req.body.phoneNumber,
            googleAuthKey: req.body.googleAuthKey
        };

        User.update(userReq, res3, function(err3) {
            if (err3 || !res3.user) return res3.status(500).send(util.norm.errors(err3));
            res.sendStatus(200);
        });
    });
}