const User = require('../models/user');

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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

exports.find = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.status(201).json(user);
  });
};
