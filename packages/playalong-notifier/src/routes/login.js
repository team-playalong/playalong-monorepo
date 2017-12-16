const express = require('express');
const config = require('config');

import { logger } from '../utils/logger';
const router = express.Router();
const apiKey = config.get('mailgun.api');
const domain = config.get('mailgun.domain');
const mailgun = require('mailgun-js')({ apiKey, domain });

function handleSentMessage(res) {
  return function (error, body) {
    if (error) {
      console.error(`Something went wrong`, error);
      res.status(500).send(`Message not sent! ${error.message}`);
    }
    else {
      console.log(body);
      res.send({ message: 'Message Sent' });
    }
   }
 }

router.post('/', (req, res) => {
  const { body } = req;
  const { uid, displayName, email } = body;

  logger.info(`${displayName} has logged in!. Email ${email}`);

  const data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `User Logged in - ${uid}`,
    text: `${displayName} has logged in!. Email ${email}`,
  };

  mailgun.messages()
  .send(data, handleSentMessage(res));
});


router.get('/login/:uid/:displayName/:email', (req, res) => {
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

export default router;
