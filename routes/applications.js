var models  = require('../models');
var express = require('express');
var router = express.Router();


var csrf = require('csurf');



var ApplicationController = require('../controllers/ApplicationController');
var ProjectController = require('../controllers/ProjectController');
var Helpers = require('../controllers/helpers/helpers');

var csrfProtection = csrf();
router.use(csrfProtection);

// GET the student submission form
router.get('/form', Helpers.isLoggedInAsStudent, ApplicationController.getApplicationForm);

// POST the student submission form
router.post('/form', Helpers.isLoggedInAsStudent, ApplicationController.postApplicationForm);

// GET the student submission form for editing
router.get('/:id/_edit', Helpers.isLoggedInAsStudent, ApplicationController.getEditApplicationForm);

// GET list of student applications
router.get('/list', ApplicationController.getApplicationList);

// GET student application detail
router.get('/:id/view', ApplicationController.getApplicationDetail);

// Post Application search
router.post('/list', ApplicationController.postSearchApplication);

// GET delete project
router.get('/:id/_delete', Helpers.isLoggedInAsStudent, ApplicationController.getDeleteApplication);

module.exports = router;