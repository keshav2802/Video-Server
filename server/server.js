const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('App is running');
})

app.use('/api/signup', require('./routes/signup'));

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})


