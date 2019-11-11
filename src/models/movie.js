const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  synopsis: String,
  rating: String,
  runtime: String,
  genre: String,
  comment: Array,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
