var models  = require('../models');
var express = require('express');
var router = express.Router();
// var upload = multer({ dest: 'public/' });


var csrf = require('csurf');
// var multer = require('multer');

// var multerUploader = multer({
//     dest: 'public/',
//
//     rename: function (fieldname, filename) {
//         return filename+Date.now();
//     },
//
//     onFileUploadData: function (file, data, req, res) {
//         console.log(data.length + ' of ' + file.fieldname + ' arrived............................')
//     },
//     onFileUploadComplete: function (file, req, res) {
//         console.log(file.fieldname + '........................... uploaded to  ' + file.path)
//         done=true;
//     }
// });


var ApplicationController = require('../controllers/ApplicationController');

var csrfProtection = csrf();
// router.use(multerUploader);
router.use(csrfProtection);

// GET the student submission form
router.get('/form', ApplicationController.getApplicationForm);

// POST the student submission form
router.post('/form', ApplicationController.postApplicationForm);

module.exports = router;