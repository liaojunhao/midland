var express = require('express');
var router = express.Router();
var Position = require('../db/index').Position;

/* GET 发布职位表单 */
router.get('/', function(req, res) {
    res.render('Release', { title: '发布职位'});
});

/* POST 发布职位表单 */
router.post('/', function (req, res) {
    let position = req.body;

    Position.create(position, function (err,data) {
        if(err){
            res.redirect('back');
        }else {
            res.redirect('/Release');
        }
    })


});

module.exports = router;