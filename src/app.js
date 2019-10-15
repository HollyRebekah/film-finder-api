const express = require('express');
const userController = require('./controllers/user');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is an API' });
});

app.post('/filmfinder/user', userController.create);

app.get('/filmfinder/user', userController.list);

module.exports = app;
