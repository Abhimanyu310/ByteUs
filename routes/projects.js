var models  = require('../models');
var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var ProjectController = require('../controllers/ProjectController');
var HomeController = require('../controllers/HomeController');

var csrfProtection = csrf();
router.use(csrfProtection);



// GET the faculty project submission form
router.get('/form', ProjectController.getCreateProject);

// GET the faculty project submission form
router.get('/:id/_edit', ProjectController.getEditProject);

// POST the faculty project submission form
router.post('/form', ProjectController.postCreateProject);

// GET list of projects page
router.get('/list', ProjectController.getProjectList);

// GET Project detail
router.get('/:id/view', ProjectController.getProjectDetail);

// GET Project submission success page
router.get('/success', ProjectController.getProjectSuccess);

// Post Project search
router.post('/list', ProjectController.postSearchProject);

module.exports = router;
