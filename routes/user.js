var express = require('express');
const queries = require('../controllers/queries.js');
const sessionController = require('../controllers/session_controller');
var router = express.Router();

router.get('/', sessionController.checkSignIn, function(req, res) {
  const user = req.session.user.user_id;
  queries.getUser(user, function(err, results) {
    if(err) {
      throw err;
    }

    let index = 1;
    if(req.query.page) {
      index = parseInt(req.query.page);
    } 
    index -= 1;
    index *= 10;
    queries.getThreadsBy10(index, function(err, results) {
      if(err) {
        throw err;
      }
      const upperLimit = results.rows[0].count_thread / 10;
      // console.log(req.session);
      res.render('user_index', { title: 'Express', threads: results.rows, index: (index / 10) + 1, upperLimit: upperLimit} );
    })
  })
})

router.get('/info', sessionController.checkSignIn, function(req, res) {
  res.render('user_info', { title: 'Express' } );
})


module.exports = router;
