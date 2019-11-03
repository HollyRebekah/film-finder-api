const User = require('../models/user');
const Movie = require('../models/movie');

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

exports.saveMovie = (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    image: req.body.image,
    synopsis: req.body.synopsis,
    rating: req.body.synopsis,
    runtime: req.body.runtime,
    genre: req.body.genre,
  });
  movie.save()
    .then(() => {
      res.status(201).json(movie);
    });
};

exports.returnMovies = (req, res) => {
  Movie.find({ genre: req.body.genre }, (err, movies) => {
    res.status(201).json(movies);
  });
};

exports.returnMovieByGenre = (req, res) => {
  Movie.find({ genre: req.body.genre })
    .then((movies) => {
      res.status(201).json(movies);
    });
};

exports.returnImage = (req, res) => {

  Movie.find({ title: { $in: req.body.title } })
    .then((movies) => {
      const images = movies.map(m => m.image);
      const uniqueImages = [... new Set(images)];
      res.status(201).json(uniqueImages);
    });
};
