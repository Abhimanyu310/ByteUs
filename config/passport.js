var passport = require('passport');
var saml = require('passport-saml');
var LocalSrategy = require('passport-local').Strategy;
var models  = require('../models');
var fs = require('fs');
var parseString = require('xml2js').parseString;




passport.serializeUser(function(user, done) {
    console.log('serializing');
    console.log(user);
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
    logoutUrl: process.env.LOGOUT_URL,
    logoutCallbackUrl: process.env.LOGOUT_CALLBACK
}, function(profile, done) {

    var xml = profile.getAssertionXml();
    parseString(xml, function (err, result) {
        console.dir(JSON.stringify(result));
        var k = result;
        // console.log(k);
        var attributes = k["saml2:Assertion"]["saml2:AttributeStatement"];

        console.log('first');
        console.log(attributes[0]);
        // var name = attributes["saml2:Attribute"]["saml2:AttributeValue"];
        // console.log('name');
        // console.log(name);
        var name0 = attributes[0]["saml2:Attribute"]["saml2:AttributeValue"];
        console.log('name0');
        console.log(name0);
        console.log(attributes);
    });
    console.log('in profile done');
    return done(null, profile);
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