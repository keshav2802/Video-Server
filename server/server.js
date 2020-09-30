const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// We can protect routes in our server by using custom middlewares.
// We will apply these middlewares using web tokens. So we are 
// creating a file calles checkAuth which will validate the users 
// from the server side.
const checkAuth = require('./middlewares/checkAuth');

// Connect the app to mongodb database
mongoose.connect('mongodb://localhost/videoServer', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
  res.send('App is running')
})

// Used to log everything like GET, POST, etc requests
app.use(morgan('dev'));

// It ensures that we prevent Cross-Origin Resource Sharing(CORS) errors
// If client makes a request from localhost:3000, and received a response from 
// server which has localhost:5000, req will fail. It is always the case with 
// RESTful APIs. So, we attach headers in the response from servers to client 
// to tell the browser that it's OK
app.use(cors());

// body-parser extracts json data and makes it easily readable to us.
app.use(bodyParser.json());

// extended: true allows to parse extended body with rich data in it.
// extended: false means the client can send only simple json objects
// and not nested objects.
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/videos', express.static('uploads'));

app.use('/api/signup', require('./routes/signup'));
app.use('/api/signin', require('./routes/signin'));
app.use('/api/upload', checkAuth, require('./routes/upload'));
app.use('/api/videolist', checkAuth, require('./routes/videoList'));

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})
