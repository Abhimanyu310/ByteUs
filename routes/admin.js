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
router.get('/application-list', AdminController.getAllSubmittedProjectsAndApplications);

// Match
router.get('/match/:project_id/:application_id', AdminController.match);

// Test matching
router.get('/matching', AdminController.doMatching);


module.exports = router;