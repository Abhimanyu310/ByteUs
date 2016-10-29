var models  = require('../models');


module.exports = {

    getHome: function(req, res, next) {
        res.render('home/index', { title: 'Home' });
    }
};