const mongoose = require('mongoose');
const app = require('./src/app');

require('dotenv').config();

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  console.log(err);
  app.listen(port, host, function() {
    console.log("Server started......."));
});
