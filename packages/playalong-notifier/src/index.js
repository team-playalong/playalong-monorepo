const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const { logger } = require('./utils/logger');
const cors = require('cors');

// https://www.npmjs.com/package/mailgun-js
const apiKey = config.get('mailgun.api');
const domain = config.get('mailgun.domain');
const mailgun = require('mailgun-js')({ apiKey, domain });
logger.info(`mailgun initializes with domain ${domain}`);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Welcome to playalong notifier...');
});

app.get('/healthcheck', function (req, res) {
  res.json({
    status: 'All Good!'
  });
});


app.post('/login', (req, res) => {
  const body = req.body;
  const { uid, displayName, email } = body;

  logger.info(`${displayName} has logged in!. Email ${email}`);

  const data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `User Logged in - ${uid}`,
    text: `${displayName} has logged in!. Email ${email}`,
  };

  mailgun.messages()
  .send(data, (error, body) => {
    console.log(body);
    res.send('Message sent!');
  });
});


app.get('/login/:uid/:displayName/:email', (req, res) => {
  const uid = req.params.uid;
  const displayName = req.params.displayName;
  const email = req.params.email;


  const data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `User Logged in - ${uid}`,
    text: `${displayName} has logged in!. Email ${email}`,
  };

  mailgun.messages()
  .send(data, (error, body) => {
    console.log(body);
    res.send('Message sent!');
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
