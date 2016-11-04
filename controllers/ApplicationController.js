var models  = require('../models');


module.exports = {

    getApplicationForm: function(req, res, next) {
        res.render('application/form', {
            title: "Student",
            csrfToken: req.csrfToken()
        });
    },

    postApplicationForm: function(req, res, next) {
        console.log('done');
        if (!req.files) {
            // console.log("no file");
        }
        if (req.files) {
            // console.log("FILES YAY");
            student_id = req.body.student_id;

            resume = req.files.resume;
            console.log(resume.name);

            resume.mv('uploads/resume-'+student_id+'.pdf', function(err) {
                if (err) {
                    // console.log('error');
                }
                else {
                    // console.log('File uploaded!');
                }
            });

            cover_letter = req.files.cover_letter;
            cover_letter.mv('uploads/cover_letter-'+student_id+'.pdf', function(err) {
                if (err) {
                    // console.log('error');
                }
                else {
                    // console.log('File uploaded!');
                }
            });
        }

        req.checkBody('email', 'Email is invalid').notEmpty().isEmail();
        req.checkBody('name', 'Invalid name').notEmpty();
        req.checkBody('phone', 'Invalid phone').notEmpty().isInt();
        var errors = req.validationErrors(true);
        if (errors) {
            // var messages = [];
            // errors.forEach(function (error) {
            //     messages.push(error.msg);
            // });
            // console.log(errors)
            req.flash('errors', errors);
            req.flash('form_data', req.body);
            // req.flash('success', "HAHA")
            res.redirect('/application/form');
        }
        else{
            // if (req.body.areas){
            //     var areas = req.body.areas[0];
            //     for(i = 1; i < req.body.areas.length; i++){
            //         areas +=  ', ' + req.body.areas[i];
            //     }
            // }

            var student = models.Student.create({
                name: req.body.name,
                sid: req.body.sid,
                gender: req.body.gender,
                hispanic_latino: req.body.origin,
                race: req.body.race,
                Contact: {
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
                },
                Academics:{
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
                },
                Apprenticeship:{
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
                }
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
                req.flash('success', 'Application Submission Successful!');
                res.redirect('/user/student-home');
            }).catch(function (error) {
                //error handling
                // console.log(error)
            });
        }
        // res.redirect('/');
        // res.render('application/form', {
        //     title: "Student",
        //     csrfToken: req.csrfToken()
        // });



    },
};