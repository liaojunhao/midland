var express = require('express');
var router = express.Router();

/* GET 公司简介 */
router.get('/', function(req, res) {
    res.render('About/introduce', { title: '公司介绍'});
});

router.get('/course', function(req, res) {
    res.render('About/course', { title: '公司历程'});
});

router.get('/culture', function(req, res) {
    res.render('About/culture', { title: '企业文化'});
});

router.get('/train', function(req, res) {
    res.render('About/train', { title: '企业培训'});
});

router.get('/elegance', function(req, res) {
    res.render('About/elegance', { title: '美联风采'});
});

module.exports = router;
