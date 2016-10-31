var models  = require('../models');
var express = require('express');
var router = express.Router();

var passport = require('passport');

var csrf = require('csurf');

var UserController = require('../controllers/UserController');

var csrfProtection = csrf();
router.use(csrfProtection);


// GET Faculty Home
router.get('/faculty-home', UserController.getFacultyHome);

// GET Student Home
router.get('/student-home', UserController.getStudentHome);

// Logout
router.get('/logout', UserController.postLogout);

router.get('/login',
    passport.authenticate('saml.login', { failureRedirect: '/login/fail' }),
    function (req, res) {
        res.redirect('/');
    }
);

router.post('/login/callback',
    passport.authenticate('saml.login', { failureRedirect: '/login/fail' }),
    function(req, res) {
        res.redirect('/');
    }
);

router.get('/login/fail',
    function(req, res) {
        res.status(401).send('Login failed');
    }
);


module.exports = router;
