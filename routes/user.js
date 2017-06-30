var express = require('express');
var router = express.Router();
var User = require('../db/index').User;

/* 注册页面 */
router.get('/reg', function(req, res) {
    res.render('user/reg',{title:'注册页面'});//后缀可以不用写
});

/* 注册提交 */
router.post('/reg', function(req, res) {
    //接收请求体，保存到数据库中
    var user = req.body;
    if(user.password != user.repassword){
        console.error('密码和重复密码不一致')
        return res.redirect('back')//表示返回上一页
    }
    //删除不需要保存的字段
    delete user.repassword

    user.password = md5(user.password);//对密码进行加密
    user.avatar = 'test123456';

    User.findOne({username:user.username},function(err,oldUser){
        if(err){
            res.redirect('back');
        }else{
            if(oldUser){
                req.flash('error','此用户名已经被占用，请换一个用户名吧');
                res.redirect('back');
            }else{
                User.create(user,function(err,doc){
                    if(err){
                        req.flash('error','注册失败');
                        //如果error有值，就表示注册失败，返回注册面页继续填写
                        res.redirect('back');
                    }else{
                        req.flash('success','注册成功');
                        req.session.user = doc;
                        //如果注册成功，跳转到登录页
                        res.redirect('/user/reg');
                    }
                });
            }
        }
    });
});

/* 用户登录 */
router.get('/login',function(req,res){
    res.render('user/login',{title:'用户登录'});
});

/* 登录提交 */
router.post('/login',function(req,res){
    let user = req.body;
    user.password = md5(user.password);
    User.findOne(user,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            if(doc){
                //向会话中写入一个消息，消息类型 消息内容
                req.flash('success','登录成功');
                //把当前登录成功后的用户对象放置到session对象中
                req.session.user = doc;
                //req.session.success = '登录成功';
                res.redirect('/');
            }else{
                req.flash('error','登录失败');
                //req.session.error = '登录失败';
                res.redirect('back');
            }
        }
    });
});

/* 退出登录 */
router.get('/logout',function(req,res){
    req.session.user = null;
    res.redirect('back');
});

function md5(val){
    return require('crypto').createHash('md5').update(val).digest('hex');
}
module.exports = router;
