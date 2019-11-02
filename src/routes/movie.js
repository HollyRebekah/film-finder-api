const express = require('express');
const movieController = require('../controllers/movie');

const router = express.Router();


router.post('/users/movie', movieController.watchedFilm);
router.get('/movies', movieController.returnMovies);
router.post('/movies/genre', movieController.returnMovieByGenre);
router.post('/movies/drama', movieController.saveMovie);
router.post('/movies/comedy', movieController.saveMovie);
router.post('/movies/kids', movieController.saveMovie);

module.exports = router;
