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

    doMatching: function (req, res, next) {
        models.Student.findAll({
            where: {submitted: 'Yes'},
            include: [
                {model: models.StudentContact, as: 'Contact'},
                {model: models.StudentAcademics, as: 'Academics'},
                {model: models.StudentApprenticeship, as: 'Apprenticeship'}
            ]
        }).then(function(applications) {
            console.log('\n\nApplications: ' + applications.length + '\n\n');
            console.log(applications);
            
            // TODO: Filter out matched students here

            // Gather student info for matching
            var studentsInfo = [];
            for (var i = 0; i < applications.length; i++)
            {
                studentsInfo.push({
                    application_id: applications[i].id,
                    project_id:     -1,
                    isMatched:      false,
                    weight:         applications[i].Academics.gpa,
                    classStanding:  applications[i].Academics.next_fall_level,
                    goldshirt:      applications[i].Academics.goldshirt,
                    gender:         applications[i].gender,
                    race:           applications[i].race,
                    appliedBefore:  applications[i].Apprenticeship.prev_application,
                    mostId:         applications[i].Apprenticeship.most_interest,
                    highId:         applications[i].Apprenticeship.high_interest,
                    moderateId:     applications[i].Apprenticeship.moderate_interest,
                    lowId:          applications[i].Apprenticeship.low_interest,
                    leastId:        applications[i].Apprenticeship.least_interest,
                });
            }

            // TODO: Filter out students who do not meet specific project requirements here

            studentsInfo.forEach(function(student)
            {
                var w = 1.00;
                switch (student.classStanding)
                {
                    case 'Freshman':
                        w -= 0.20;
                        break;
                    case 'Sophomore':
                        w -= 0.10;
                        break;
                    case 'Junior':
                    default:
                        // no change
                        break;
                    case 'Senior':
                        w += 0.10;
                        break;
                    case '5th Year Senior':
                        w += 0.20;
                        break;
                }
                switch (student.race)
                {
                    case 'AIorAN':
                    case 'BorAA':
                    case 'NHorPI':
                        w += 0.05;
                        break;
                    case 'Asian':
                    case 'Caucasian':
                    case 'DNW':
                    default:
                        // no change
                        break;
                }
                w += (student.goldshirt == 'Yes') ? 0.10 : 0.00;
                w += (student.gender == 'female' || student.gender == 'Female') ? 0.10 : 0.00;
                w += (student.appliedBefore == 'Yes') ? 0.05 : 0.00;
                student.weight *= w;
            });

            // Sort descending order
            studentsInfo.sort(function(x,y) { return (x.weight <= y.weight) ? 1 : -1;})

            console.log("\n\nStudent info:\n\n");
            console.log(studentsInfo);

            // Greedy match
            for(var i = 0; i < studentsInfo.length; i++)
            {
                var s = studentsInfo[i];
                Helpers.isMatchedStudent(s.application_id, function (isStudentMatched) {
                    if(!isStudentMatched)
                    {
                        Helpers.isMatchedProject(s.mostId, function (isMostProjectMatched) {
                            if(!isStudentMatched)
                            {
                                Helpers.match_or_update(s.mostId, s.application_id, 'No', function(match){
                                    console.log('\nMatch Most:\n');
                                    console.log(match);
                                    s.project_id = s.mostId;
                                    s.isMatched = true;
                                    //res.redirect('/');
                                    //console.log('after typing match');
                                });
                            }
                            else { Helpers.isMatchedProject(s.highId, function (isHighProjectMatched) {
                                if(!isHighProjectMatched)
                                {
                                    Helpers.match_or_update(s.highId, s.application_id, 'No', function(match){
                                        console.log('\nMatch High:\n');
                                        console.log(match);
                                        s.project_id = s.highId;
                                        s.isMatched = true;
                                        //res.redirect('/');
                                        //console.log('after typing match');
                                    });
                                }
                                else {  Helpers.isMatchedProject(s.moderateId, function (isModerateProjectMatched) {
                                    if(!isModerateProjectMatched)
                                    {
                                        Helpers.match_or_update(s.moderateId, s.application_id, 'No', function(match){
                                            console.log('\nMatch Moderate:\n');
                                            console.log(match);
                                            s.project_id = s.moderateId;
                                            s.isMatched = true;
                                            //res.redirect('/');
                                            //console.log('after typing match');
                                        });
                                    }
                                    else {  Helpers.isMatchedProject(s.lowId, function (isLowProjectMatched) {
                                        if(!isLowProjectMatched)
                                        {
                                            Helpers.match_or_update(s.lowId, s.application_id, 'No', function(match){
                                                console.log('\nMatch Low:\n');
                                                console.log(match);
                                                s.project_id = s.lowId;
                                                s.isMatched = true;
                                                //res.redirect('/');
                                                //console.log('after typing match');
                                            });
                                        }
                                        else { Helpers.isMatchedProject(s.leastId, function (isLeastProjectMatched) {
                                            if(!isLeastProjectMatched)
                                            {
                                                Helpers.match_or_update(s.leastId, s.application_id, 'No', function(match){
                                                    console.log('\nMatch Least:\n');
                                                    console.log(match);
                                                    s.project_id = s.leastId;
                                                    s.isMatched = true;
                                                    //res.redirect('/');
                                                    //console.log('after typing match');
                                                });
                                            }
                                        });}
                                    });}
                                });}
                            });}
                        });
                    }
                });
            }

            res.render('admin/matching', {
                title: "Matching",
                studentsInfo: studentsInfo
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
    }
    
 };