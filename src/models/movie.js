const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  synopsis: String,
  runtime: String,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
