const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.conntect(process.env.DATABASE_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  console.log(err);
  app.listen(300);
});
