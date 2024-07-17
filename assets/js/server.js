const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to The Avengers Karate Class');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
