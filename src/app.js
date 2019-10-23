const express = require('express');
const userController = require('./controllers/user');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is an API' });
});

app.post('/filmfinder/users', userController.signUp);

app.post('/filmfinder/auth', userController.logIn);

app.get('/filmfinder/users', userController.list);

app.get('/filmfinder/users/:id', userController.find);

app.post('/filmfinder/users/:id', userController.watchedFilm);

module.exports = app;
