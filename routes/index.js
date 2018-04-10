var express = require('express');
var router = express.Router();
var apodService = require('../services/apod');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('fetchpicture');
});


// Fetch a picture from NASA's APOD service
router.get('/fetchpicture', function(req, res, next){
  // if (req.query.picturetype === 'random') {
  //   res.send('todo: get random picture');
  // }
  // else {
  //   // default is today's Pictures
  //   res.send('tody: get today\'s picture');
  // }

  // If random picture requested, fetch random picture
  // Otherwise fecth today's picture

  apodService(function(err, apod_data){
    if (err){
      res.render('apod_error', {message: err.message, title: 'Error'});
    } else {
      res.render('index', {apod: apod_data, title: 'APOD for $(apod_data.date_)'});
    }
  }, req.query.picturetype);
})

module.exports = router;
