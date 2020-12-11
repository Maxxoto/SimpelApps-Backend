const express = require('express');
const app = express();
const rfs = require('rotating-file-stream');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9000;
const keys = require('./config/keys');
const passport = require('passport');

// Server setup
app.use(cors());
app.use(bodyparser.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(passport.initialize());

// Rotating logstream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs'),
});
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

// Database Connection
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Models
require('./models/Examination');
require('./models/Invoice');
require('./models/Sample');
require('./models/User');
require('./services/passport');
// Routes
const authRoutes = require('./routes/authRoutes');
const examinationRoutes = require('./routes/examinationRoutes');

app.get('/', (req, res) => {
  res.send('API Services is healthy');
});
authRoutes(app);
examinationRoutes(app);

app.listen(PORT, () => {
  console.log(`Server live and running on port ${PORT}`);
});
