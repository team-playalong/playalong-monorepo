const express = require('express');
const config = require('config');

const router = express.Router();
const apiKey = config.get('mailgun.api');
const domain = config.get('mailgun.domain');
const mailgun = require('mailgun-js')({ apiKey, domain });

router.post('/login', (req, res) => {
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
