var models  = require('../models');
var path = require('path');




module.exports = {

    getApplicationList: function(req, res, next) {
        
    },

    getApplicationDetail: function(req, res, next) {

    },

    postSearchApplication: function(req, res, next) {

    },
    
    getApplicationForm: function(req, res, next) {
        var errors = req.flash('errors');
        var form_data = req.flash('form_data');
        models.Project.findAll().then(function(projects) {
            res.render('application/form', {
                title: "Student",
                header: 'Student Apprenticeship Information',
                projects: projects,
                errors: errors,
                hasErrors: errors.length > 0,
                formData: form_data[0],
                csrfToken: req.csrfToken()
            });
        }).catch(function (error) {
            //error handling
            // console.log(error)
        });


    },

    getEditApplicationForm: function(req, res, next){
        var applicationId = req.params.id;
        models.Student.findOne({
            where: {id: applicationId},
            include: [
                {model: models.StudentContact, as: 'Contact'},
                {model: models.StudentAcademics, as: 'Academics'},
                {model: models.StudentApprenticeship, as: 'Apprenticeship'}
            ]
        }).then(function (application){
            // console.log(project)
            if (application.submitted == 'Yes'){
                res.redirect('/application/'+applicationId+'/view');
            }
            else{
                models.Project.findAll().then(function(projects) {
                    res.render('application/form', {
                        title: "Edit Application",
                        projects: projects,
                        application: application,
                        csrfToken: req.csrfToken()
                    });
                }).catch(function (error) {
                    //error handling
                    // console.log(error)
                });
            }

        });
    },

    postApplicationForm: function(req, res, next) {
        if (req.body.action == 'Submit'){

            req.checkBody('sid', 'Please enter a valid SID').notEmpty().isInt();
            req.checkBody('gender', 'Please enter your gender').notEmpty();
            req.checkBody('origin', 'Please enter your origin').notEmpty();
            req.checkBody('race', 'Please select your race').notEmpty();

            req.checkBody('street_address', 'Please enter your complete address').notEmpty();
            req.checkBody('city', 'Please enter your complete address').notEmpty();
            req.checkBody('state', 'Please enter your complete address').notEmpty();
            req.checkBody('zip', 'Please enter your complete address').notEmpty().isInt();
            req.checkBody('phone', 'Please enter a valid phone number').notEmpty().isInt();
            req.checkBody('email', 'Please enter a valid email').notEmpty().isEmail();


            req.checkBody('gpa', 'Please enter a valid GPA').notEmpty();
            req.checkBody('next_fall_level', 'Please select your next fall status').notEmpty();
            req.checkBody('grad_month', 'Please enter your graduation month').notEmpty();
            req.checkBody('grad_year', 'Please enter a your graduation year').notEmpty();
            req.checkBody('prev_research_exp', 'Please indicate if you have had a previous reserch experience').notEmpty();

            req.checkBody('prev_application', 'Please indicate if you have previously applied for an apprenticeship').notEmpty();
            req.checkBody('most_interest', 'Please select at least one project').notEmpty();
            req.checkBody('background_check', 'Please indicate if you have had a background check at CU').notEmpty();
            req.checkBody('awareness_training', 'Please indicate if you have had a Discrimination & Harassment Awareness training at CU').notEmpty();
            req.checkBody('ssn', 'Please enter the last 4 digits of your SSN').notEmpty();

            req.checkBody('resume', 'Please upload your resume in PDF').isPDF(req.files.resume.name);
            req.checkBody('cover_letter', 'Please upload a cover letter in PDF').isPDF(req.files.cover_letter.name);

        }
        req.checkBody('name', 'You need to enter your name').notEmpty();
        req.checkBody('primary_major', 'You need to enter your primary major').notEmpty();
        var errors = req.validationErrors(true);
        if (errors) {
            req.flash('errors', errors);
            req.flash('form_data', req.body);
            // req.flash('success', "HAHA")
            res.redirect('/application/form');
        }
        else{
            var action;
            if (req.body.action == 'Save'){
                action = 'No';
            }
            else if (req.body.action == 'Submit'){
                action = 'Yes';
                saveFiles(req, res, next);
            }

            addApplicationToDB(req, res, next, action);
        }
        
        
            

    }
};


function saveFiles(req, res, next){
    // Save files
    if (req.files) {
        // console.log("FILES YAY");
        student_id = req.body.sid;

        resume = req.files.resume;
        if (resume){
            // if ((path.extname(resume.name)).toLowerCase() != '.pdf'){
            //     res.redirect('/application/form');
            // }

            resume.mv('uploads/resume-'+student_id+'.pdf', function(err) {
                if (err) {
                    // console.log('error');
                }
                else {
                    // console.log('File uploaded!');
                }
            });
        }




        cover_letter = req.files.cover_letter;
        if (cover_letter){
            // if ((path.extname(cover_letter.name)).toLowerCase() != '.pdf'){
            //     res.redirect('/application/form');
            // }
            cover_letter.mv('uploads/cover_letter-'+student_id+'.pdf', function(err) {
                if (err) {
                    // console.log('error');
                }
                else {
                    // console.log('File uploaded!');
                }
            });
        }


    }
}

function addApplicationToDB(req, res, next, action) {



    //define the application
    //define student
    var Student = {
        name: req.body.name,
        sid: req.body.sid,
        gender: req.body.gender,
        hispanic_latino: req.body.origin,
        race: req.body.race,
        submitted: action,
    };

    var Contact = {
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email,
        summer_street_address: req.body.summer_street_address,
        summer_city: req.body.summer_city,
        summer_state: req.body.summer_state,
        summer_zip: req.body.summer_zip,
        summer_phone: req.body.summer_phone,
        summer_email: req.body.summer_email
    };

    var Academics = {
        primary_major: req.body.primary_major,
        secondary_major: req.body.secondary_major,
        gpa: req.body.gpa,
        next_fall_level: req.body.next_fall_level,
        grad_month: req.body.grad_month,
        grad_year: req.body.grad_year,
        prev_research_exp: req.body.prev_research_exp,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3
    };

    var Apprenticeship = {
        prev_application: req.body.prev_application,
        fall_employment_plans: req.body.fall_employment_plans,
        most_interest: req.body.most_interest,
        high_interest: req.body.high_interest,
        moderate_interest: req.body.moderate_interest,
        low_interest: req.body.low_interest,
        least_interest: req.body.least_interest,
        background_check: req.body.background_check,
        awareness_training: req.body.awareness_training,
        ssn: req.body.ssn
    };


    models.Student.findOne({
        where: {
            id: req.body.id
        },
        include: [
            {model: models.StudentContact, as: 'Contact'},
            {model: models.StudentAcademics, as: 'Academics'},
            {model: models.StudentApprenticeship, as: 'Apprenticeship'}
        ]
    }).then(function (application) {
        if (application) {
            application.updateAttributes(Student)
                .then(function (student) {
                    student.Contact.updateAttributes(Contact)
                        .then(function (contact) {
                            student.Academics.updateAttributes(Academics)
                                .then(function (academics) {
                                    student.Apprenticeship.updateAttributes(Apprenticeship)
                                        .then(function (apprenticeship) {
                                            req.flash('success', 'Application Successfully Saved!');
                                            res.redirect('/project/success');
                                        })
                                })

                        });
                }).catch(function (error) {
                //error handling
                console.log(error)
            });
        }
        else {
            var new_application = models.Student.create({
                name: req.body.name,
                sid: req.body.sid,
                gender: req.body.gender,
                hispanic_latino: req.body.origin,
                race: req.body.race,
                submitted: action,
                user_id: req.user.id,
                Contact: Contact,
                Academics: Academics,
                Apprenticeship: Apprenticeship
            }, {
                include: [
                    {model: models.StudentContact, as: 'Contact'},
                    {model: models.StudentAcademics, as: 'Academics'},
                    {model: models.StudentApprenticeship, as: 'Apprenticeship'}
                ]
            }).then(function (task) {
                // task.setFaculty([faculty]).then(function () {
                //         //done
                //     });
                // console.log(task)
                if (action == 'Yes') {
                    req.flash('success', 'Application Submission Successful!');
                }
                else {
                    req.flash('success', 'Application Successfully Saved!');
                }

                res.redirect('/project/success');
            }).catch(function (error) {
                //error handling
                console.log(error)
            });
        }
    });
}

