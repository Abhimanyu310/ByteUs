var express = require('express');
var router = express.Router();

// Project submission for faculty
router.get('/submit-project', function(req, res, next) {
  res.render('Faculty_Form', { title: "Faculty Form" });
});

module.exports = router;