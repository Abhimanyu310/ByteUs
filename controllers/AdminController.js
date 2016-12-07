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

    getMatchings: function (req, res, next) {

        // Get students here
        models.Student.findAll({
            include: [
                {model: models.StudentContact, as: 'Contact'},
                {model: models.StudentAcademics, as: 'Academics'},
                {model: models.StudentApprenticeship, as: 'Apprenticeship'}
            ]
        }).then(function(applications) {
            console.log(applications);
        });

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
                gender:     (Math.round(Math.random())) ? 'male' : 'female',
                goldShirt:  (Math.random() < 0.90) ? 'Yes' : 'No',
                ethnicBias: (Math.random() < 0.75) ? 1.00 : 1.15,
                mostId:     40 * Math.floor(Math.random()) + 1,
                highId:     40 * Math.floor(Math.random()) + 1,
                moderareId: 40 * Math.floor(Math.random()) + 1,
                lowId:      40 * Math.floor(Math.random()) + 1,
                leastId:    40 * Math.floor(Math.random()) + 1
            });
        }

        studentsInfo.forEach(function(student) {
            var w = student.weight;
            w *= student.gpa;
            w = (student.gender == 'female') ? w * 1.15 : w;
            w = (student.goldShirt == 'Yes') ? w * 1.15 : w;
            w = w * student.ethnicBias;
            student.weight = w;
        });

        studentsInfo.sort(function(student_a,student_b) { return (student_a.weight <= student_b.weight) ? -1 : 1;})
        
        // Match students greedily until options run out 

        // res.render('admin/admin-index', {
        //     title: "Matchings",
        //     matchings: matchInfo
        // })
    },

        match: function (req, res, next) {
        var project_id = req.params.project_id;
        var application_id = req.params.application_id;
        Helpers.isMatchedStudent(application_id, function (matched) {
            if(matched){
                console.log('Matched');
            }
            else{
                console.log('Not matched');
            }
        });
        // If project is already matched, it updates the student. Else creates a new entry
        Helpers.match_or_update(project_id, application_id, 'No', function(match){
            // console.log('before typing match');
            // console.log(match);
            res.redirect('/');
            // console.log('after typing match');
        });
    }
    
 };