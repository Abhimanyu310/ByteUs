var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/projects', function(req, res, next) {
    models.Project.findAll().then(function(projects) {
        res.render('project_list', {
            title: 'Sequelize: Express Example',
            projects: projects
        });
    });
});

module.exports = router;
