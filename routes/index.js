var models  = require('../models');
var express = require('express');
var router = express.Router();


var csrf = require('csurf');

var ProjectController = require('../controllers/ProjectController');
var HomeController = require('../controllers/HomeController');

var csrfProtection = csrf();
router.use(csrfProtection);


// GET home page.
router.get('/', HomeController.getHome);


module.exports = router;
