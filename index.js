const express = require('express');
const app = express();
const rfs = require('rotating-file-stream');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 9000;
app.use(cors());

// Rotating logstream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs'),
});

app.use(bodyparser.json());

// Setup logger untuk akses logstream
app.use(morgan('combined', { stream: accessLogStream }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

// const commentRoutes = require('./routes/commentRoutes.js');

// commentRoutes(app);

app.listen(PORT, () => {
  console.log(`Server live and running on port ${PORT}`);
});
