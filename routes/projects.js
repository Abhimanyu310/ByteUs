var models  = require('../models');
var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var ProjectController = require('../controllers/ProjectController');
var HomeController = require('../controllers/HomeController');
var Helpers = require('../controllers/helpers/helpers');

var csrfProtection = csrf();
router.use(csrfProtection);

router.use('/', Helpers.isLoggedIn, function (req, res, next) {
    next();
});

// GET the faculty project submission form
router.get('/form', Helpers.isLoggedInAsFaculty, ProjectController.getCreateProject);

// GET the faculty project submission form for editing
router.get('/:id/_edit', Helpers.isLoggedInAsFaculty, ProjectController.getEditProject);

// POST the faculty project submission form
router.post('/form', Helpers.isLoggedInAsFaculty, ProjectController.postCreateProject);

// GET list of projects page
router.get('/list', ProjectController.getProjectList);

// GET Project detail
router.get('/:id/view', ProjectController.getProjectDetail);

// GET Project submission success page
router.get('/success', Helpers.isLoggedInAsFaculty, ProjectController.getProjectSuccess);

// Post Project search
router.post('/list', ProjectController.postSearchProject);

module.exports = router;

