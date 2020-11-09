var express = require('express');
const queries = require('../controllers/queries.js');
var router = express.Router();

/* POST crear thread. */
router.post('/', function(req, res) {
    queries.getLogin(req.body.user_mail, req.body.user_password, function(err, results) {
        if (err) {
            throw err;
        }
        if(results.rows.length === 1) {
            // Login
            let user = {
                id: results.rows[0].user_id,
                name: results.rows[0].username,
                mail: results.rows[0].user_mail  
            }
            req.session.authenticated = true;
            req.session.user = user;
            // console.log('Hello: ' + user);
            res.redirect('/user');
        } else {
            req.session.authenticated = false;
            // console.log("Login: " + req.session.authenticated);
            res.redirect('/?session=failed');
        }
    })
});

module.exports = router;
