var models  = require('../models');


module.exports = {

    getApplicationForm: function(req, res, next) {
        res.render('application/form', { title: "Student" });
    }
};