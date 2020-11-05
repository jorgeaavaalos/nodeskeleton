var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users'} );
});

/* GET crear thread. */
router.get('/crear_thread', function(req, res, next) {
  res.render('crear_thread', { title: 'Crear thread'} );
});

/* POST crear thread. */
router.post('/crear_thread', function(req, res, next) {
  console.log('Exito');
  res.redirect('/users');
});

module.exports = router;
