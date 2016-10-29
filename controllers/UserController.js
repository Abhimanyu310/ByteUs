var models  = require('../models');


module.exports = {

    getStudentHome: function(req, res, next) {
        res.render('Student_Home', { title: "Student Home" });
    },

    getFacultyHome: function(req, res, next) {
        res.render('Faculty_Home', { title: "Faculty Home" });
    },
    
    postLogout: function(req, res, next) {
        res.render('Logout', { title: "Logout" });
    }
};