var models  = require('../models');
var express = require('express');
var router = express.Router();
var fs = require('fs');


var passport = require('passport');
var saml = require('../config/passport')

var csrf = require('csurf');

var ProjectController = require('../controllers/ProjectController');
var HomeController = require('../controllers/HomeController');

var csrfProtection = csrf();
router.use(csrfProtection);


// GET home page.
router.get('/', HomeController.getHome);


router.get('/Shibboleth.sso/Metadata',
    function(req, res) {
        res.type('application/xml');
        res.status(200).send(saml.samlStrategy.generateServiceProviderMetadata(fs.readFileSync(process.env.SP_CERTIFICATE, 'utf8')));
    }
);


module.exports = router;
