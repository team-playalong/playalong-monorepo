const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  console.log('asd')
  res.send('all good');
});

export default router;
