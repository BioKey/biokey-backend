const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../config');
const TypingProfile = require('./typingProfile');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String
  },
  googleAuthKey: {
    type: String
  },
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: ('Organization'),
    required: true
  }
});

// On Save hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

/**
 * Hook to ensure referential integrity.
 */
userSchema.pre('remove', function(next) {
  TypingProfile.remove({user: this._id}).exec();
  next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  User.findOne({ _id: this._id })
    .select('+password')
    .exec(function(err, user) {
      if (err) { return callback(err); }

      bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
      });
    });
}

userSchema.methods.getToken = function() {
  return jwt.encode({
    sub: this._id,
    iat: new Date().getTime()
  }, config.secret);
}

const User = mongoose.model('User', userSchema);
module.exports = User;