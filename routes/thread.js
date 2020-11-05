var express = require('express');
const db = require('../config/db.js');
const queries = require('../controllers/queries.js');
const mysql = require('mysql');
var router = express.Router();

/* GET thread page. */
router.get('/', function(req, res, next) {
    res.render('thread', { title: 'Thread' });
});

/* GET thread page. */
router.get('/:id', function(req, res, next) {
    console.log(req.params.id)
    queries.getComments(req.params.id, function(err, results) {
        if(err) {
            throw err;
        }
        res.render('thread', { title: 'Thread', comments: results.rows });
    })
});

/* GET edit thread page. */
router.get('/edit', function(req, res, next) {
    res.render('thread_edit', { title: 'Edit Thread' });
});

/* GET delete thread page. */
router.get('/delete', function(req, res, next) {
    res.render('thread_delete', { title: 'Delete Thread' });
});





module.exports = router;
