var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('api works');
});
router.get('/administrators', function(req, res, next) {
  let data = [{firstname:'rick',lastname:'carroll'}]
  res.status(200).json(data);
});

module.exports = router;
