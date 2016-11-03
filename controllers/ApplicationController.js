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

            resume.mv('uploads/resume-'+student_id, function(err) {
                if (err) {
                    console.log('error');
                }
                else {
                    console.log('File uploaded!');
                }
            });

            cover_letter = req.files.cover_letter;
            cover_letter.mv('uploads/cover_letter-'+student_id, function(err) {
                if (err) {
                    console.log('error');
                }
                else {
                    console.log('File uploaded!');
                }
            });
        }
        res.redirect('/');
        // res.render('application/form', {
        //     title: "Student",
        //     csrfToken: req.csrfToken()
        // });
    },
};