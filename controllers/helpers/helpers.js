var models  = require('../../models');


exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    if (req.originalUrl != '/user/logout'){
        req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // req.session.oldUrl = '/project' + req.url;
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }

};


exports.isLoggedInAsFaculty = function(req, res, next) {
    if (req.isAuthenticated() && (req.user.type == 'Faculty' || req.session.cu_user.type == 'Faculty')) {
        return next();
    }
    if (req.originalUrl != '/user/logout'){
        req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // req.session.oldUrl = '/project' + req.url;
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
};


exports.isLoggedInAsStudent = function(req, res, next) {
    if (req.isAuthenticated() && (req.user.type == 'Student' || req.session.cu_user.type == 'Student')) {
        return next();
    }
    if (req.originalUrl != '/user/logout'){
        req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // req.session.oldUrl = '/project' + req.url;
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
};

exports.notLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};


exports.match_or_update = function(project_id, application_id, override, callback){
    models.Match.findOne({
        where: {
            project_id: project_id
        }
    }).then(function (match) {
        if (match) {
        //     console.log('yes match');
            match.updateAttributes({
                student_id: application_id,
                override: override
            }).then(function (match) {
                return callback(match);
            }).catch(function (error) {
            //error handling
            console.log(error)
            });
        }
        else {
            // console.log('no match');
            var new_match = models.Match.create({
                project_id: project_id,
                student_id: application_id,
                override: override
            }).then(function (match) {
                // console.log('before return');
                return callback(match);
            }).catch(function (error) {
                //error handling
                console.log(error)
            });
        }
    });


};