var models  = require('../models');
var Helpers = require('../controllers/helpers/helpers');

var nodeExcel = require('excel-export');


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
    },

    export: function (req, res, next) {

        var conf ={};
        // conf.stylesXmlFile = "styles.xml";
        conf.name = "matrix";
        conf.cols = [{
            caption:'Project Name',
            type:'string'
        },{
            caption:'Student Name',
            type:'string'
        },{
            caption:'Primary Major',
            type:'string'
        },{
            caption:'Secondary Major',
            type:'string'
        },{
            caption:'Level in School',
            type:'string'
        },{
            caption:'Grad Date',
            type:'string'
        },{
            caption:'GPA',
            type:'string'
        },{
            caption:'Gender',
            type:'string'
        },{
            caption:'Previous Experience',
            type:'string'
        },{
            caption:'Other Employment Plans',
            type:'string'
        },{
            caption:'Applied Before',
            type:'string'

        }];

        models.Project.findAll().then(function(projects) {
            var row_data = [];
            var done = 0;
            for (var i = 0; i < projects.length; i++){
                // find matched student
                Helpers.findMatchedStudent(projects[i].id, projects[i].description, function (matched_id, name) {
                    console.log('matched id for ' + name + ' is ' + matched_id);
                    console.log('done is ' + done);


                    models.Student.findOne({
                        where: {
                            id: matched_id
                        },
                        include: [
                            {model: models.StudentContact, as: 'Contact'},
                            {model: models.StudentAcademics, as: 'Academics'},
                            {model: models.StudentApprenticeship, as: 'Apprenticeship'}
                        ]
                    }).then(function(application) {
                        if (application) {
                            var a = [
                                name,
                                application.name,
                                application.Academics.primary_major,
                                application.Academics.secondary_major,
                                application.Academics.next_fall_level,
                                application.Academics.grad_month / application.Academics.grad_year,
                                application.Academics.gpa,
                                application.gender,
                                application.Academics.prev_research_exp,
                                application.Apprenticeship.fall_employment_plans,
                                application.Apprenticeship.prev_application
                            ];
                        }
                        else{
                            a = [name, '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
                        }

                        row_data.push(a);

                        // console.log('row data is');
                        // console.log(row_data);
                        if (++done == projects.length) {
                            // console.log('in done');
                            // console.log(row_data);
                            conf.rows = row_data;
                            var result = nodeExcel.execute(conf);
                            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                            res.setHeader("Content-Disposition", "attachment; filename=" + "Matrix.xlsx");
                            res.end(result, 'binary');
                        }



                    }).catch(function (error) {
                        //error handling
                        // console.log(error)
                    });


                    // if (++done == 2){
                    //     console.log('really done');
                    // }
                    //     // get matched student data
                //
                });
                console.log(i);

            }
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });

        // conf.rows = [
        //     ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        //     ["e", new Date(2012, 4, 1), false, 2.7182],
        //     ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        //     ["null date", null, true, 1.414]
        // ];


    }
    
    
 };
