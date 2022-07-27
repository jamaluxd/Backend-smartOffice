require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');

// connect to the Database
mongoose.connect(process.env.Mongo_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Conntected to Database'));

app.listen(process.env.PORT, () =>
  console.log(
    `Server Started on http://localhost:${process.env.PORT}`
  )
);
