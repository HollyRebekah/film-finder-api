const mongoose = require('mongoose');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  password: String,
  favouriteGenres: Array,
  filmsWatched: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
