const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/filmfinder', userRouter);

app.use('/filmfinder', movieRouter);

app.use('/filmfinder', authRouter);

module.exports = app;
