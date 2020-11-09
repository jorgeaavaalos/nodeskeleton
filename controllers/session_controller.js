function checkSignIn(req, res, next){
    if(req.session.user){
       next();     //If session exists, proceed to page
    } else {
        // console.log('Not logged in!')
        res.redirect('/');
    }
}

function checkNotLoggedIn(req, res, next){
    if(!req.session.user){
       next();     //If session doesn't exists, proceed to page
    } else {
        // console.log('Already logged in!')
        res.redirect('/user');
    }
}

module.exports.checkSignIn = checkSignIn;
module.exports.checkNotLoggedIn = checkNotLoggedIn;