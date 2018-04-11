var express = require('express');
var router = express.Router();

// Get favorite page
router.get('/', function(req, res, next){
  res.render('favorites', { favorites: req.session.favorites });
});


// POST to add a new favorites to user's favorites
router.post('/add', function(req, res, next){

  // If a fav array doesn't exist in this session, create it
  if(!req.session.favorites) {
    req.session.favorites = [];
  }

  // Is this image already a favorites?
  var favorite_on_date = req.session.favorites.filter(function(fav) {
    return fav.date == req.body.date
  });

  // If no fav found with the date, then add to the sessions' favorites array
  if (favorite_on_date.length == 0) {
    req.session.favorites.push(req.body);
  }

  // Redirect to the favorites page
  res.redirect('/favorites');
});


// POST to delete ALL favorite images of the user
router.post('/deleteAll', function(req, res, next){
  req.session.favorites = []; // overwrite/reset favorites to a new array

  // Redirect to the favorites page
  res.redirect('/favorites');
});


// POST to delete this favorite images from the favorites
router.post('/delete', function(req, res, next){

  req.session.favorites.splice(req.body.index, 1);

  // Redirect to the favorites page
  res.redirect('/favorites');
});

module.exports = router;
