var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Lyric = require('./lyric.js');

var userSchema = new mongoose.Schema({
  local     : {
    email   : String,
    password: String,
  },
  facebook  : {
    id      : String,
    token   : String,
    email   : String,
    name    : String
  },
  twitter   : {
    id      : String,
    token   : String,
    displayName :String,
    username : String
  },
  google    : {
    id      : String,
    token   : String,
    email   : String,
    name    : String
  }
});

userSchema.methods.generateHash = function(password) {
  //HASH
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};
//IS VALID
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
