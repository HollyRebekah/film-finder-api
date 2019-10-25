const express = require('express');
const cors = require('cors');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is an API' });
});

app.post('/filmfinder/users', userController.signUp);

app.get('/filmfinder/users', userController.list);

app.get('/filmfinder/users/:id', userController.find);

app.post('/filmfinder/user/movie', userController.watchedFilm);

app.post('/filmfinder/auth', authController.logIn);

module.exports = app;
