var express = require('express');
const queries = require('../controllers/queries.js');
const sessionController = require('../controllers/session_controller');
var router = express.Router();

router.get('/create', sessionController.checkSignIn, function(req, res) {
    res.render('crear_thread', { title: 'Crear Thread' } );
});

router.post('/create', sessionController.checkSignIn, function(req, res) {
    res.redirect('/user');
});

/* GET edit thread page. */
router.get('/edit', sessionController.checkSignIn, function(req, res, next) {
    res.render('thread_edit', { title: 'Edit Thread' });
});

/* GET delete thread page. */
router.get('/delete', sessionController.checkSignIn, function(req, res, next) {
    res.render('thread_delete', { title: 'Delete Thread' });
});

/* GET thread page. */
router.get('/:id', function(req, res, next) {
    queries.getComments(req.params.id, function(err, results) {
        if(err) {
            throw err;
        }
        // console.log(req.session);
        res.render('thread', { title: 'Thread', comments: results.rows });
    })
});





module.exports = router;
