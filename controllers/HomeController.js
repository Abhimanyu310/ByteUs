var models  = require('../models');


module.exports = {

    getHome: function(req, res, next) {
        // console.log(req.session);
        // console.log(req);
        // console.log(req.isAuthenticated());

        // 
        var validation_errors = req.flash('errors');

        res.render('home/index', {
            title: 'Home',
            csrfToken: req.csrfToken(),
            errors: validation_errors,
            hasErrors: validation_errors.length > 0
        });
    }
};