var models  = require('../models');
var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var ProjectController = require('../controllers/ProjectController');
var HomeController = require('../controllers/HomeController');

var csrfProtection = csrf();
router.use(csrfProtection);


// GET home page.
router.get('/', HomeController.getHome);

// Project submission for student
router.get('/student-submit', function(req, res, next) {
    res.render('Student_Form', { title: "Student" });
});

// Project success for faculty and student
router.get('/success', function(req, res, next) {
    res.render('Success', { title: "Yay" });
});

// Faculty Home
router.get('/faculty-home', function(req, res, next) {
    res.render('Faculty_Home', { title: "Faculty Home" });
});

// Student Home
router.get('/student-home', function(req, res, next) {
    res.render('Student_Home', { title: "Student Home" });
});

// Logout
router.get('/logout', function(req, res, next) {
    res.render('Logout', { title: "Logout" });
});



// GET the faculty project submission form
router.get('/submit-project', ProjectController.getCreateProject);

// POST the faculty project submission form
router.post('/submit-project', ProjectController.postCreateProject);

// GET list of projects page
router.get('/projects', ProjectController.getProjectList);

// GET Project detail
router.get('/projects/:id/view', ProjectController.getProjectDetail);


module.exports = router;
