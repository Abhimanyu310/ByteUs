exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // req.session.oldUrl = '/project' + req.url;
    res.redirect('/');
};


exports.isLoggedInAsFaculty = function(req, res, next) {
    if (req.isAuthenticated() && (req.user.type == 'Faculty' || req.session.cu_user.type == 'Faculty')) {
        return next();
    }
    req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // req.session.oldUrl = '/project' + req.url;
    res.redirect('/');
};

exports.isLoggedInAsStudent = function(req, res, next) {
    if (req.isAuthenticated() && (req.user.type == 'Student' || req.session.cu_user.type == 'Student')) {
        return next();
    }
    req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // req.session.oldUrl = '/project' + req.url;
    res.redirect('/');
};

exports.notLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};