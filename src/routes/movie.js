const express = require('express');
const movieController = require('../controllers/movie');

const router = express.Router();


router.post('/users/movie', movieController.watchedFilm);

router.post('/movies', movieController.saveMovie);
router.get('/movies', movieController.returnMovies);

module.exports = router;
