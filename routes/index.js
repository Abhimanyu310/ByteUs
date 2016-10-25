var models  = require('../models');
var Project = require('../models/project');
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Title' });
});

// Project submission for faculty
router.get('/submit-project', function(req, res, next) {
    res.render('Faculty_Form', { title: "Hah" });
});

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

// Post the project submission form
router.post('/submit-project', function(req, res, next) {
    if (req.body.areas){
        var areas = req.body.areas[0];
        for(i = 1; i < req.body.areas.length; i++){
            areas +=  ', ' + req.body.areas[i];
        }
    }

    models.Project.create({
        name: req.body.name,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        email: req.body.email,
        faculty_department: req.body.faculty_department,
        edc: req.body.edc,
        secondary_name: req.body.secondary_name,
        secondary_phone1: req.body.secondary_phone1,
        secondary_phone2: req.body.secondary_phone2,
        secondary_phone3: req.body.secondary_phone3,
        secondary_email: req.body.secondary_email,
        secondary_faculty_department: req.body.secondary_faculty_department,
        post_doc_name: req.body.post_doc_name,
        post_doc_phone1: req.body.post_doc_phone1,
        post_doc_phone2: req.body.post_doc_phone2,
        post_doc_phone3: req.body.post_doc_phone3,
        post_doc_email: req.body.post_doc_email,
        description: req.body.description,
        url: req.body.url,
        requirements1: req.body.requirements1,
        requirements2: req.body.requirements2,
        requirements3: req.body.requirements3,
        requirements4: req.body.requirements4,
        requirements5: req.body.requirements5,
        longdescription: req.body.longdescription,
        areas: areas,
        supervision_req: req.body.supervision_req,
        supervision_provided: req.body.supervision_provided,
        nature_of_work: req.body.nature_of_work,
        nature_of_work_other: req.body.nature_of_work_other,
        prior_work: req.body.prior_work,
        prior_work_other: req.body.prior_work_other,
        match_of_funding: req.body.match_of_funding,
        not_sure: req.body.not_sure,
        contact: req.body.contact,
        supervised_past: req.body.supervised_past,
        specific_students1: req.body.specific_students1,
        specific_students2: req.body.specific_students2,
        specific_students3: req.body.specific_students3,
    }).then(function (task) {
        res.redirect('/projects');
        // res.render('Faculty_Form', { title: task.name });
    }).catch(function (error) {
        //error handling
    });
    // var project = models.Project.build({name: req.body.name});
    // project.save().then(function() {
    //     res.render('Faculty_Form', { title: "SAVED!"});
    // })
    // res.render('Faculty_Form', { title: req.body.name });
});


// GET list of projects page
router.get('/projects', function(req, res, next) {
    models.Project.findAll().then(function(projects) {
        res.render('project_list', {
            title: 'List of Projects',
            projects: projects
        });
    });
});

module.exports = router;
