var models  = require('../models');

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
        var user = req.user;
        user.getProjects().then(function (projects) {
            res.render('admin/admin-index', {
                title: "Projects",
                projects: projects
            });
        });
    },

    getStudentSubmittedApplicationsForAdmin: function (req, res, next) {
        var user = req.user;
        user.getApplications().then(function (applications) {
            res.render('admin/admin-index', {
                title: "Projects",
                applications: applications
            });
        });
    }
 };
