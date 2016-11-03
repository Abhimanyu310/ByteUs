var models  = require('../models');
var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var ApplicationController = require('../controllers/ApplicationController');

var csrfProtection = csrf();
router.use(csrfProtection);

// GET the student submission form
router.get('/form', ApplicationController.getApplicationForm);

// POST the student submission form
router.post('/form', ApplicationController.postApplicationForm);


module.exports = router;