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
router.get('/admin-home', AdminController.getAdminHome);

// GET faculty Submitted projects
router.get('/admin-home/project-list',AdminController.getFacultySubmittedProjectsForAdmin)

// GET student submitted Applications
router.get('/admin-home/application-list',AdminController.getStudentSubmittedApplicationsForAdmin)

module.exports = router;