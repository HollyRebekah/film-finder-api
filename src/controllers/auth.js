const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.logIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user !== null && user.validatePassword(req.body.password)) {
        const payload = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          filmsWatched: user.filmsWatched,
          filmImages: user.filmImages,
          id: user._id,
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' }, (err, token) => {
          res.status(200).json(token);
        });
      } else {
        res.sendStatus(401);
      }
    });
};
