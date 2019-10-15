const User = require('../models/user');

exports.create = (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    favouriteGenres: [null],
    filmsWatched: [null],
  });
  user.save()
    .then(() => {
      res.status(201).json(user);
    });
};

exports.list = (req, res) => {
  User.find({}, (err, users) => {
    res.status(201).json(users);
  });
};
