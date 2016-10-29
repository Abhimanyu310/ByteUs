var models  = require('../models');


module.exports = {

    getStudentHome: function(req, res, next) {
        res.render('user/student-index', { title: "Student Home" });
    },

    getFacultyHome: function(req, res, next) {
        res.render('user/faculty-index', { title: "Faculty Home" });
    },
    
    postLogout: function(req, res, next) {
        res.render('user/logout', { title: "Logout" });
    }
};