var express = require('express');
var router = express.Router();

/* GET thread page. */
router.get('/', function(req, res, next) {
    res.render('thread', { title: 'Thread' });
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
