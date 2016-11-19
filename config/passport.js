var passport = require('passport');
var saml = require('passport-saml');
var LocalSrategy = require('passport-local').Strategy;
var models  = require('../models');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var randomstring = require("randomstring");




passport.serializeUser(function(user, done) {
    // console.log('serializing');
    // console.log(user);
    // console.log('serialize id');
    // console.log(user.id);
    // done(null, user.id);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // console.log(id);
    // models.User.findOne({
    //     where: {id: id}
    // }).then(function (user){
    //     // console.log(user);
    //     done(null, user);
    // });
    done(null, user);
});



var samlStrategy = new saml.Strategy({
    // URL that goes from the Identity Provider -> Service Provider
    callbackUrl: process.env.CALLBACK_URL,
    // URL that goes from the Service Provider -> Identity Provider
    entryPoint: process.env.ENTRY_POINT,
    // Usually specified as `/shibboleth` from site root
    issuer: process.env.ISSUER,
    identifierFormat: null,
    // Service Provider private key
    decryptionPvk: fs.readFileSync(process.env.PRIVATE_KEY_SAML, 'utf8'),
    // Service Provider Certificate
    privateCert: fs.readFileSync(process.env.PRIVATE_KEY_SAML, 'utf8'),
    // Identity Provider's public key
    cert: fs.readFileSync(process.env.IDP_PUBLIC_KEY, 'utf8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
    passReqToCallback: true,
    logoutUrl: process.env.LOGOUT_URL,
    logoutCallbackUrl: process.env.LOGOUT_CALLBACK
}, function(req, profile, done) {
    // console.log(profile.nameID);
    var user_attributes = [];
    var xml = profile.getAssertionXml();
    parseString(xml, function (err, result) {
        var attributes_section = result["saml2:Assertion"]["saml2:AttributeStatement"][0];

        for (var key in attributes_section) {
            // skip loop if the property is from prototype
            if (!attributes_section.hasOwnProperty(key)) continue;

            var obj = attributes_section[key];
            for (var prop in obj) {
                // skip loop if the property is from prototype
                if(!obj.hasOwnProperty(prop)) continue;

                var attributes = obj[prop]["saml2:AttributeValue"][0]["_"]
                user_attributes.push(attributes);

            }
        }

    });
    var type = user_attributes[0];
    var email = user_attributes[1];
    var name = user_attributes[2];
    console.log('in profile done');

    req.session.CU = true;
    req.session.type = user_attributes[0];
    req.session.email = user_attributes[1];
    req.session.name = user_attributes[2];

    models.User.findOne({
        where: {email: email}
    }).then(function (user){
        if (user){
            req.session.user_id = user.id;
            // return done(null, user);
            return done(null, profile);
        }

        var newUser = models.User.build();
        newUser.email = email;
        newUser.password = randomstring.generate({
            length: 15,
            charset: 'alphanumeric'
        });
        newUser.type = type;


        newUser.save().then(function (user) {
            // return done(null, user);
            req.session.user_id = user.id;
            return done(null, profile);
        }).catch(function (error) {
            return done(error);
        });
    }).catch(function (error) {
        return done(error);
    });
    // console.log(profile);
    // return done(null, profile);
});

passport.use('saml.login', samlStrategy);


// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     else
//         return res.redirect('/login');
// }

// app.get('/',
//     ensureAuthenticated,
//     function(req, res) {
//         res.send('Authenticated');
//     }
// );


exports.samlStrategy = samlStrategy;



passport.use('local.signup', new LocalSrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 6});
    req.checkBody('type', 'Please select what type of user you are').notEmpty();


    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('errors', messages));
    }


    // var errors = req.validationErrors(true);
    // if (errors) {
    //     req.flash('errors', errors);
    //     return done(null, false, req.flash('errors', errors));
    // }


    models.User.findOne({
        where: {email: email}
    }).then(function (user){
        if (user){
            return done(null, false, {message: 'Email already in use.'});
        }

        var newUser = models.User.build();
        newUser.email = email;
        newUser.password = password;
        newUser.type = req.body.type;

        newUser.save().then(function (user) {
            return done(null, user);
        }).catch(function (error) {
            return done(error);
        });
    }).catch(function (error) {
        return done(error);
    });

}));



passport.use('local.signin', new LocalSrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();

    var errors = req.validationErrors(true);
    if (errors) {
        return done(null, false, req.flash('errors', errors));
    }

    models.User.findOne({
        where: {email: email}
    }).then(function (user){
        if (!user){
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)){
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    }).catch(function (error) {
        return done(error);
    });

}));