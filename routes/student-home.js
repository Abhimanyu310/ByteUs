var express = require('express');
var router = express.Router();

// Student Home
router.get('/student-home', function(req, res, next) {
    res.render('Student_Home', { title: "Student Home" });
});

module.exports = router;