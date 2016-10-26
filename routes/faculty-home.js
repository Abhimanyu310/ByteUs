var express = require('express');
var router = express.Router();

// Faculty Home
router.get('/faculty-home', function(req, res, next) {
    res.render('Faculty_Home', { title: "Faculty Home" });
});

module.exports = router;