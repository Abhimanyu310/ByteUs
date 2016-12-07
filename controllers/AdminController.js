var models  = require('../models');
var Helpers = require('../controllers/helpers/helpers');


module.exports = {


	getAdminHome: function(req, res, next) {
        res.render('admin/admin-index', {
            title: "Admin Home",
        });
    }, 

    
    getAllSubmittedApplications: function (req, res, next) {
        models.Student.findAll({
            where: {submitted: 'Yes'},
            include: [
                {model: models.StudentContact, as: 'Contact'},
                {model: models.StudentAcademics, as: 'Academics'},
                {model: models.StudentApprenticeship, as: 'Apprenticeship'}
            ]
        }).then(function(applications) {
            console.log(applications);
            res.render('admin/admin-index', {
                title: "List of Submitted Applications",
                applications: applications
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });
    },

    getAllApplications: function (req, res, next) {
        models.Student.findAll({
            include: [
                {model: models.StudentContact, as: 'Contact'},
                {model: models.StudentAcademics, as: 'Academics'},
                {model: models.StudentApprenticeship, as: 'Apprenticeship'}
            ]
        }).then(function(applications) {
            console.log(applications);
            res.render('admin/admin-index', {
                title: "List of Applications",
                applications: applications
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });
    },

    getAllSubmittedProjects: function (req, res, next) {
        models.Project.findAll({
            where: {submitted: 'Yes'},
            include: [
                {model: models.FacultyInfo, as: 'Faculty'}
            ]
        }).then(function(projects) {
            res.render('admin/admin-index', {
                title: "List of Submitted Projects",
                projects: projects
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });
    },

    getAllSubmittedProjectsAndApplications: function (req, res, next) {
        models.Project.findAll({
            where: {submitted: 'Yes'},
            include: [
                {model: models.FacultyInfo, as: 'Faculty'}
            ]
        }).then(function(projects) {
            models.Student.findAll({
                include: [
                    {model: models.StudentContact, as: 'Contact'},
                    {model: models.StudentAcademics, as: 'Academics'},
                    {model: models.StudentApprenticeship, as: 'Apprenticeship'}
                ]
            }).then(function(applications) {
                // console.log(applications);
                res.render('admin/admin-index', {
                    title: "List of Submitted Projects",
                    projects: projects,
                    applications: applications
                });
            }).catch(function (error) {
                //error handling
                // console.log(error)
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });
    },

    getAllProjects: function (req, res, next) {
        models.Project.findAll({
            include: [
                {model: models.FacultyInfo, as: 'Faculty'}
            ]
        }).then(function(projects) {
            console.log(applications);
            res.render('admin/admin-index', {
                title: "List of Projects",
                projects: projects
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });
    },
    
    getFacultySubmittedProjectsForAdmin: function (req, res, next) {
        if (req.session.CU){
            var user = req.session.cu_user;
        }
        else{
            user = req.user;
        }
        user.getProjects().then(function (projects) {
            res.render('admin/admin-index', {
                title: "Projects",
                projects: projects
            });
        });
    },

    getStudentSubmittedApplicationsForAdmin: function (req, res, next) {
        if (req.session.CU){
            var user = req.session.cu_user;
        }
        else{
            user = req.user;
        }
        user.getApplications().then(function (applications) {
            res.render('admin/admin-index', {
                title: "Projects",
                applications: applications
            });
        });
    },

    match: function (req, res, next) {
        var project_id = req.params.project_id;
        var application_id = req.params.application_id;
        // If project is already matched, it updates the student. Else creates a new entry
        Helpers.match_or_update(project_id, application_id, 'No', function(match){
            // console.log('before typing match');
            console.log(match);
            res.redirect('/');
            // console.log('after typing match');
        });
    }
    
    
 };
