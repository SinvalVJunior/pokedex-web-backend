const express = require('express');
const users = require('./src/controllers/user-controller');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', users);


app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});