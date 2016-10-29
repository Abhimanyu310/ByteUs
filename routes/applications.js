var models  = require('../models');
var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var ApplicationController = require('../controllers/ApplicationController');

var csrfProtection = csrf();
router.use(csrfProtection);

// Project submission for student
router.get('/form', ApplicationController.getApplicationForm);




module.exports = router;