const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');

const { logger } = require('./utils/logger');
const cors = require('cors');
import login from './routes/login';

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');

// https://www.npmjs.com/package/mailgun-js
const apiKey = config.get('mailgun.api');
const domain = config.get('mailgun.domain');
const mailgun = require('mailgun-js')({ apiKey, domain });
logger.info(`mailgun initializes with domain ${domain}`);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/login', login);

app.get('/', function (req, res) {
  res.send('Welcome to playalong notifier...');
});

app.get('/healthcheck', function (req, res) {
  res.json({
    status: 'All Good!'
  });
});


app.get('/childAdded/:chordId', (req, res) => {
  const chordId = req.params.chordId;

  const data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `Chord Added - ${chordId}`,
    text: `https://playalong-prod.firebaseio.com/chords/${chordId}`,
  };

  mailgun.messages()
  .send(data, (error, body) => {
    console.log(body);
    res.send('Message sent!');
    console.log(`New Chord Added with Chord ID of ${chordId}`);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});
