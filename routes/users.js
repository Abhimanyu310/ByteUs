var models  = require('../models');
var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var UserController = require('../controllers/UserController');

var csrfProtection = csrf();
router.use(csrfProtection);


// GET Faculty Home
router.get('/faculty-home', UserController.getFacultyHome);

// GET Student Home
router.get('/student-home', UserController.getStudentHome);

// Logout
router.get('/logout', UserController.postLogout);

module.exports = router;
