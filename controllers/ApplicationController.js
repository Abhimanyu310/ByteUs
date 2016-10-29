var models  = require('../models');


module.exports = {

    getApplicationForm: function(req, res, next) {
        res.render('Student_Form', { title: "Student" });
    }
};