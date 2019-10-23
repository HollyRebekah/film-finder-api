const User = require('../models/user');

exports.signUp = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    favouriteGenres: [],
    filmsWatched: [],
  });
  user.save()
    .then(() => {
      res.status(201).json(user.removePassword());
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const emailError = error.errors.email ? error.errors.email.message : null;
        const passwordError = error.errors.password ? error.errors.password.message : null;
        res.status(400).json({
          errors: {
            email: emailError,
            password: passwordError,
          },
        });
      } else {
        res.sendStatus(500);
      }
    });
};

exports.logIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user.validatePassword(req.body.password)) {
        res.status(200).json(user);
      } else {
        res.status(401).json({
          message: 'The email/password combination is incorrect',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
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

exports.watchedFilm = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.filmsWatched.push(req.body.movie);
      user.save()
        .then(() => {
          res.status(201).json(user.removePassword());
        });
    });
};
