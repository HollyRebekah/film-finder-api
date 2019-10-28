const User = require('../models/user');
const Movie = require('../models/movie');

exports.watchedFilm = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.filmsWatched.push(req.body.movie);
      user.filmImages.push(req.body.movieImage);
      user.save()
        .then(() => {
          res.status(201).json(user.removePassword());
        });
    });
};

exports.saveMovie = (req, res) =>{
  const movie = new Movie({
    title: req.body.title,
    image: req.body.image,
    synopsis: req.body.synopsis,
    runtime: req.body.runtime,
  });
  movie.save()
    .then(() => {
      res.status(201).json(movie);
    });
};

exports.returnMovies = (req, res) => {
  Movie.find({}, (err, movies) => {
    res.status(201).json(movies);
  });
};