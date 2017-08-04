var express = require('express');
var router = express.Router();

/* GET 联系我们 */
router.get('/', function(req, res) {

    res.render('contact', { title: '联系我们'});

});

module.exports = router;
