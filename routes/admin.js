var models  = require('../models');
var express = require('express');
var router = express.Router();

var passport = require('passport');

var csrf = require('csurf');

var AdminController = require('../controllers/AdminController');
var Helpers = require('../controllers/helpers/helpers');


var csrfProtection = csrf();
router.use(csrfProtection);


// GET Admin Home
router.get('/', AdminController.getAdminHome);

// GET faculty Submitted projects
router.get('/project-list', AdminController.getAllSubmittedProjects);

// GET student submitted Applications
router.get('/application-list', AdminController.getAllSubmittedApplications);

// GET student submitted Applications
router.get('/match/:project_id/:application_id', AdminController.match);


module.exports = router;