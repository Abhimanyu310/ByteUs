var models  = require('../models');
var express = require('express');
var router = express.Router();

var passport = require('passport');

var csrf = require('csurf');

var UserController = require('../controllers/UserController');
var Helpers = require('../controllers/helpers/helpers');





// var csrfProtection = csrf();
// router.use(csrfProtection);


// GET Faculty Home
router.get('/faculty-home', UserController.getFacultyHome);

// GET Student Home
router.get('/student-home', UserController.getStudentHome);

// Logout
router.get('/logout', Helpers.isLoggedIn, UserController.getLogout);


router.use('/', Helpers.notLoggedIn, function (req, res, next) {
    next();
});


//Local strategy
router.get('/signup', UserController.getSignUp);

router.post('/signup',passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), UserController.postSignUp);


router.get('/signin', UserController.getSignIn);

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), UserController.postSignIn);


//SAML
router.get('/login',
    passport.authenticate('saml.login', { failureRedirect: '/login/fail' }),
    function (req, res) {
        res.redirect('/');
    }
);

// router.post('/login/callback',
//     passport.authenticate('saml.login', { failureRedirect: '/login/fail' }),
//     function(req, res) {
//         res.redirect('/');
//     }
// );

router.post('/login/callback', function (req, res, next) {
   console.log('in callback');
   console.log(req);
   console.log(req.body);
   console.log(req.user);
});

router.get('/login/fail',
    function(req, res) {
        res.status(401).send('Login failed');
    }
);



module.exports = router;



