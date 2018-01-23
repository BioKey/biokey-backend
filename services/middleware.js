const passportService = require('../services/passport');
const passport = require('passport');
const User = require('../models/user');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

//Determine if the user is an admin.
const requireAdmin = function(req, res, next){
    //Require user to be authenticated
    requireAuth(req, res, function(req2, res2, next2){
        //Checks if the user was found
        if(!req2.user) {
            console.log("Bad moon rising");
            res2.status(500).send("There was a problem with your session.");
        }
        //Checks if the user is an admin
        else if(!req2.user.isAdmin){
            console.log("Get outta town");
            console.log(req2.user);
            res2.status(403).send("Permission denied.");
        }
        else {
            console.log("Admin");
            next2();
        }
    });
}

module.exports = { requireAuth, requireSignin, requireAdmin };