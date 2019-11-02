const mongoose = require('mongoose');
const app = require('./src/app');

require('dotenv').config();

const port = 8080;

mongoose.connect(process.env.DATABASE_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  console.log(err);
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
});
