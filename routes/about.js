var express = require('express');
var router = express.Router();

/* GET 公司简介 */
router.get('/', function(req, res) {

    res.render('About/introduce', { title: '公司介绍'});

});

module.exports = router;
