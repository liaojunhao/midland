var express = require('express');
var router = express.Router();

/* GET 福利薪酬 */
router.get('/', function(req, res) {
    res.render('welfare/welfare', { title: '福利薪酬'});
});

module.exports = router;
