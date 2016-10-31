var passport = require('passport');
var saml = require('passport-saml');
var fs = require('fs');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
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
    disableRequestedAuthnContext: true
}, function(profile, done) {
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
