const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  synopsis: String,
  runtime: String,
  genre: String,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
