var express = require('express');
var router = express.Router();

// Logout
router.get('/logout', function(req, res, next) {
    res.render('Logout', { title: "Logout" });
});

module.exports = router;