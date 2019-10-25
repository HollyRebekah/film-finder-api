const express = require('express');
const movieController = require('../controllers/movie');

const router = express.Router();


router.post('/user/movie', movieController.watchedFilm);

module.exports = router;
