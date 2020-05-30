var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My New App', message : 'Ipsum elit enim et magna elit dolore. Do fugiat id ex fugiat cillum aliquip ipsum labore exercitation cillum do laboris occaecat. Reprehenderit deserunt cupidatat aliquip quis reprehenderit dolor enim incididunt id mollit nostrud dolor. Laboris consequat ullamco do et. Sint non occaecat non anim dolore voluptate aliqua.' });
  //next(createError(404));
});

module.exports = router;
