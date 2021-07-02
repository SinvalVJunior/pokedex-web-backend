const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});