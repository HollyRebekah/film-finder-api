const User = require('../models/user');

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
