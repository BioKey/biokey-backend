const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
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
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.ObjectId, 
    ref: ('Organization'),
    required: true
  }
});

// On Save hook, encrypt password
userSchema.pre('save', function(next){
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  User.findOne({_id: this._id})
  .select('+password')
  .exec(function(err, user){
    if(err) { return callback(err); }

    bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
      if(err) { return callback(err); }

      callback(null, isMatch);
    });
  });
}

const User = mongoose.model('User', userSchema);
module.exports = User;