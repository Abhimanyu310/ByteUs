var express = require('express');
var router = express.Router();

// Project success for faculty and student
router.get('/success', function(req, res, next) {
    res.render('Success', { title: "Success" });
});

module.exports = router;