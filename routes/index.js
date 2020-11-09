var express = require('express');
const sessionController = require('../controllers/session_controller');
var router = express.Router();

/* GET home page. */
router.get('/', sessionController.checkNotLoggedIn, function(req, res) {
  res.render('index', {title: 'Express'})
});

// Destroy session
router.get('/logout', sessionController.checkSignIn, function(req, res) {
  req.session.destroy();
  // console.log('Session destroyed');
  res.redirect('/');
})

module.exports = router;
