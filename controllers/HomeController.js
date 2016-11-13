var models  = require('../models');


module.exports = {

    getHome: function(req, res, next) {
        // console.log(req.session);
        // console.log(req);
        // console.log(req.isAuthenticated());

        // 


        res.render('home/index', {
            title: 'Home',
            // user: req.user
        });
    }
};