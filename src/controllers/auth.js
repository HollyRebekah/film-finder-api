const User = require('../models/user');

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
