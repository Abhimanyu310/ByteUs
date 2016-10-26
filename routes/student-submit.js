var express = require('express');
var router = express.Router();

// Project submission for student
router.get('/student-submit', function(req, res, next) {
    res.render('Student_Form', { title: "Student Application Form" });
});

module.exports = router;