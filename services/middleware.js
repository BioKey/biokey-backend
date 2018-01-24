const passportService = require('../services/passport');
const passport = require('passport');
const User = require('../models/user');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

//Determine if the user is an admin.
const requireAdmin = function(req, res, next){
    //Require user to be authenticated
    requireAuth(req, res, function(){
        //Checks if the user was found
        if(!req.user) { res.status(500).send("There was a problem with your session."); }
        //Checks if the user is an admin
        else if(!req.user.isAdmin){ res.status(401).send("Permission denied."); }
        else { next(); }
    });
}

module.exports = { requireAuth, requireSignin, requireAdmin };