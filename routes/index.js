var models  = require('../models');
var Project = require('../models/project');
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Project submission for faculty
router.get('/submit-project', function(req, res, next) {
    res.render('Faculty_Form', { title: "Hah" });
});

// Post the project submission form
router.post('/submit-project', function(req, res, next) {
    models.Project.create({name: req.body.name}).then(function (task) {
        res.render('Faculty_Form', { title: task.name });
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
            title: 'Sequelize: Express Example',
            projects: projects
        });
    });
});

module.exports = router;
