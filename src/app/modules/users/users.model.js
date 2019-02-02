const { Schema } = require('mongoose');

const User = new Schema({
  name             : String,
  mothersSurname   : String,
  fathersSurname   : String,
  email            : String,
  password         : String,
  emailConfirmation: {
    type   : Boolean,
    default: false
  }
});

module.exports = User;
