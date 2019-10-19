const express = require('express');
const userController = require('./controllers/user');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is an API' });
});

app.post('/filmfinder/users', userController.create);

app.get('/filmfinder/users', userController.list);

app.get('/filmfinder/users/:id', userController.find);

module.exports = app;
