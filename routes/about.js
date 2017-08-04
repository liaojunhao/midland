var express = require('express');
var router = express.Router();

/* GET 公司简介 */
router.get('/', function(req, res) {
    res.render('About/introduce', { title: '公司介绍'});
});

router.get('/course', function(req, res) {
    res.render('About/course', { title: '公司历程'});
});

module.exports = router;
