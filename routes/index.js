var express = require('express');
const db = require('../config/db.js');
const queries = require('../controllers/queries.js');
const mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  queries.getUser('jorge', function(err, results) {
    if(err) {
      throw err;
    }
    // console.log('Éxito');
    // console.log(results);
    queries.getThreadsBy10(null, function(err, results) {
      // console.log(results);
      res.render('index', { title: 'Express', threads: results });
    })
  })
});

/* POST create user. */
router.post('/', function(req, res) {

  queries.postUser(req.body.username, req.body.user_email, req.body.user_password, function(err, results) {
    if(err) {
      throw err;
    }
    console.log('Éxito post');
    // console.log(results);
    res.redirect('/');
  })
});

module.exports = router;
