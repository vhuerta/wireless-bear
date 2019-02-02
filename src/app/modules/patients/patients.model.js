const { Schema } = require('mongoose');

const Patient = new Schema({
  name          : String,
  mothersSuname : String,
  fathersSurname: String,
  birthDay      : Date
});

module.exports = Patient;
