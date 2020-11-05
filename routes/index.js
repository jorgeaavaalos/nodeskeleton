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
    let page = 0;
    if(req.params.page != null) {
      page = req.params.page;
    }

    console.log("https://picsum.photos/200/300?random499&blur".length);
    console.log("https://picsum.photos/200/300?random49&blur".length);
    page *= 10;
    console.log(page);
    queries.getThreadsBy10(page, function(err, results) {
      // console.log(results.rows);
      console.log(results.rows[0])
      // console.log(results)
      res.render('index', { title: 'Express', threads: results.rows, pages: results.rows[0].count_thread / 10 });
    })
  })
});

// /* GET home page. */
// router.get('/:page', function(req, res) {
//   queries.getUser('jorge', function(err, results) {
//     if(err) {
//       throw err;
//     }
//     // console.log('Éxito');
//     // console.log(results);
//     let page = 0;
//     if(req.params.page != null) {
//       page = req.params.page;
//     }

//     console.log(req.params);
//     page *= 10;
//     console.log(page);
//     queries.getThreadsBy10(page, function(err, results) {
//       // console.log(results.rows);
//       // console.log(results.rows[0])
//       res.render('index', { title: 'Express', threads: results.rows });
//     })
//   })
// });

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
