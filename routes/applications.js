var models  = require('../models');
var express = require('express');
var router = express.Router();


var csrf = require('csurf');



var ApplicationController = require('../controllers/ApplicationController');
var Helpers = require('../controllers/helpers/helpers');

var csrfProtection = csrf();
router.use(csrfProtection);

// GET the student submission form
router.get('/form', Helpers.isLoggedInAsStudent, ApplicationController.getApplicationForm);

// POST the student submission form
router.post('/form', Helpers.isLoggedInAsStudent, ApplicationController.postApplicationForm);

module.exports = router;