var express = require('express');
var router = express.Router();
var Position = require('../db/index').Position;


/* GET 职位列表页面 */
router.get('/:pageNum/:pageSize', function(req, res) {
    var pageNum = req.params.pageNum && req.params.pageNum>0?parseInt(req.params.pageNum):1;
    var pageSize =req.params.pageSize && req.params.pageSize>0?parseInt(req.params.pageSize):8;

    let {city,gory,group} = req.query;
    let query = {};

    /*
    * 查询操作符测试
    * query["$or"] = [{"place":city},{"category":gory},{"group":group}];
    * query["$or"] = [{"place":{"$in":city}},{"category":{"$in":gory}},{"group":{"$in":group}}];
    * query={ $and: [ {place:city}, {category:gory}] }
    * query={ place: { $elemMatch: city } }
    * */

    if(city){
        query.place = {"$in":city}
    }
    if(gory){
        query.category = {"$in":gory}
    }
    if(group){
        query.group = {"$in":group}
    }

    //console.log(query);
    Position.count(query, function (err,count) {
        //console.log(count)
        Position.find(query).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
            if(err){
                res.redirect('back');
            }else {
                //格式化时间字符串
                //var PostTime =[];
                //articles.time = articles.forEach(function (item,index) {
                //    item.time.toLocaleString().myFormatTime("{0}-{1}-{2}")
                //})
                //articles.PostTime = PostTime;
                res.render('SocialRecruit/social',{
                    title:'社会招聘',
                    pageNum:pageNum,
                    pageSize:pageSize,
                    keyword:req.session.keyword, //关键字
                    totalPage:Math.ceil(count/pageSize), //总页数
                    articles:articles,
                    active:"active"
                });
            }
        });
    })

});

router.post('/', function (req, res) {

});





/*
* 投递简历路由
* */
router.get('/Delivery/:_id', function (req,res) {
    //当用户投递简历的时候，更新当前职位列表上面的Stat数组，在数组中新增一条
})


~function (pro) {
    pro.myFormatTime = myFormatTime;
    function myFormatTime(template) {
        var res = null,
            ary = this.match(/\d+/g);
        template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        res = template.replace(/\{(\d+)\}/g, function () {
            var val = ary[arguments[1]];
            !val ? val = "00" : null;
            val.length < 2 ? val = "0" + val : null;
            return val;
        });
        return res;
    }
}(String.prototype);

module.exports = router;
