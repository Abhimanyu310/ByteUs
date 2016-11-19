var models  = require('../models');
var saml = require('../config/passport');


module.exports = {

    getStudentHome: function(req, res, next) {
        var success = req.flash('success');
        var user = req.user;
        user.getApplications().then(function(applications) {
            //console.log(applications);
            res.render('user/student-index', {
                title: "Student Home",
                success: success,
                hasSuccess: success.length > 0,
                applications: applications
            });
        });
    },

    getFacultyHome: function(req, res, next) {
        res.render('user/faculty-index', {
            title: "Faculty Home"
        });

    },

    getFacultySubmittedProjects: function (req, res, next) {
        var user = req.user;
        user.getProjects().then(function (projects) {
            res.render('user/faculty-index', {
                title: "Projects",
                projects: projects
            });
        });
    },

    getStudentSubmittedApplications: function (req, res, next) {
        var user = req.user;
        user.getApplications().then(function (applications) {
            res.render('user/faculty-index', {
                title: "Projects",
                applications: applications
            });
        });
    },
    
    getSignUp: function(req, res, next) {
        var validation_errors = req.flash('errors');
        console.log(validation_errors);
        res.render('user/signup', {
            title: "User Register",
            csrfToken: req.csrfToken(),
            errors: validation_errors,
            hasErrors: validation_errors.length > 0
        });
    },

    postSignUp: function(req, res, next) {
        if (req.session.oldUrl){
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else{
            res.redirect('/');
        }
    },

    getSignIn: function(req, res, next) {
        var validation_errors = req.flash('errors');
        res.render('user/signin', {
            title: "User Login",
            csrfToken: req.csrfToken(),
            errors: validation_errors,
            hasErrors: validation_errors.length > 0
        });
    },

    postSignIn: function(req, res, next) {
        console.log('printing req.session.passport.user');
        console.log(req.session.passport.user);
        console.log('printing req.user');
        console.log(req.user.id);
        if (req.session.oldUrl){
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else{
            res.redirect('/');
        }
    },
    
    getLogout: function(req, res, next) {
        if(req.isAuthenticated()){
            if(req.session.CU){
                saml.samlStrategy.logout(req, function(err, requestUrl) {
                    // LOCAL logout
                    req.logout();
                    req.session.CU = '';
                    req.session.cu_user = '';
                    // redirect to the IdP with the encrypted SAML logout request
                    console.log('HEREEEEEEEEEEEEEEEEEEEEE');
                    console.log(requestUrl);
                    res.redirect(requestUrl);
                });
            }
            else {
                req.logout();
                res.render('user/logout', { title: "Logout" });
            }
        }
        else{
            res.render('user/logout', { title: "Logout" });
        }
        // req.logout();

    }


};