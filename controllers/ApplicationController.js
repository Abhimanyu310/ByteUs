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
        // res.render('application/form', {
        //     title: "Student",
        //     csrfToken: req.csrfToken()
        // });
    },
};