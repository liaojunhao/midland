/**
 * Created by andyjhl on 2017/6/27.
 * 简历模块路由
 */
var express = require('express');
var router = express.Router();
var Resume = require('../db/index').Resume;
var User = require('../db/index').User;

/* 访问简历页面 */
router.get('/:_id', function(req, res) {
    Resume.findOne({user:req.params._id}, function (err,sumeData) {

        if(sumeData){
            //格式化时间
            var birthdayTime = sumeData.birthday.toLocaleString().myFormatTime("{0}年{1}月{2}号");
            var fromTime = sumeData.work_from_param.toLocaleString().myFormatTime("{0}年{1}月{2}号");
            res.render('resum/resume',{title:'简历',sumeData,birthdayTime,fromTime});
        }else {
            res.render('resum/resume',{title:'简历',sumeData:false,state:'无',fromTime:'',birthdayTime:''});
        }
    })
});

router.post('/:_id', function(req, res) {
    let sume = req.body;
    //简历等于会话中用户对象的_id属性
    sume.user = req.session.user._id;

    //1、先判断有没有这条数据
    //2、有的话就修改
    //3、没有的话就新增
    Resume.findOne({user:req.params._id}, function (err,sumeData) {
        if(err){
            res.redirect('back');
        }else {
            if(sumeData){
                Resume.update({user:req.params._id},sume,function(){
                    res.redirect(`/resume/${req.params._id}`);
                })
            }else {
                Resume.create(sume,function(err,doc){
                    if(err){
                        res.redirect('back');
                    }else{

                        //console.log(doc._id);//这个就是当前简历的ID，要添加给当前用户
                        User.update({_id:req.params._id},{resume:doc._id}, function (err,data) {
                            if(err){
                                res.redirect('back');
                            }else {
                                res.redirect('back');
                            }
                        })

                    }
                });
            }
        }
    })
});


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