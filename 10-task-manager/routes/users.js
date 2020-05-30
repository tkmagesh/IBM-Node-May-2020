var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 /*  var imageFile = require('path').join(__dirname, '../public/images/Visa-Photo.JPG');
  res.attachment(imageFile);
  res.sendFile(imageFile) */
  res.send('respond with some text');
});

module.exports = router;
