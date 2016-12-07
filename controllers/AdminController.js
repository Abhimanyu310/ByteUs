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

    getMatchings: function (req, res, next) {

        // Get Unmatched info. here
        // models.Matchings.findAll({
        //     where: {},
        //     include: [{}]
        // }).then(function (matchInfo)) {  }

        // randomly generated data
        var projectsInfo = {};
        var sudentsInfo = [];
        for (var i = 1; i <= 40; i++)
        {
            projectsInfo[i] = {
                studentId: -1,
                projectId: i,
                isMatched: false
            };

            studentsInfo.push({
                studentId:  i,
                projectId: -1,
                weight:     1.0,
                gpa:        4.0 * Math.floor(Math.random()) + 1,
                mostId:     40 * Math.floor(Math.random()) + 1,
                highId:     40 * Math.floor(Math.random()) + 1,
                moderareId: 40 * Math.floor(Math.random()) + 1,
                lowId:      40 * Math.floor(Math.random()) + 1,
                leastId:    40 * Math.floor(Math.random()) + 1
            });
        }

        res.render('admin/admin-index', {
            title: "Matchings",
            matchings: matchInfo
        })
    },

    

 };

function compareStudentWeight(student_a,student_b) {
        if (student_a.weight <= student_b.weight)
            return -1;
        if (student_a.weight > student_b.weight)
            return 1;
        //return 0;
}
