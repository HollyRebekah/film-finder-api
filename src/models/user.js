const mongoose = require('mongoose');
const isEmail = require('isemail');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters'],
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  favouriteGenres: Array,
  filmsWatched: Array,
});

userSchema.pre('save', function encrytPassword(next) {
  if (!this.isModified('password')) {
    next();
  }
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      next(error);
    } else {
      this.password = hash;
      return next();
    }
  });
});

userSchema.methods.removePassword = function removePassword() {
  const userObject = this.toObject();
  const { password, ...rest } = userObject;
  return rest;
};

const User = mongoose.model('User', userSchema);


module.exports = User;
