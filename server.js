const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const checkJwt = require('./src/middlewares/token-validator');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.Promise = global.Promise;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => { console.log('DB connected successfully!') });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Application listening at port: ${port}`);
});