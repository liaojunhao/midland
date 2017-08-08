let express = require('express');//express框架
let path = require('path');//处理路径模块join
let favicon = require('serve-favicon');//收藏夹图标
let logger = require('morgan');//记录日志
let cookieParser = require('cookie-parser');//解析cookie中间件 req.cookies
let bodyParser = require('body-parser');//解析请求体 req.body
let settings = require('./settings');

let Index = require('./routes/index');      // 主页路由
let user = require('./routes/user');        // 用户页路由
let social = require('./routes/social');    // 职位列表路由
let resume = require('./routes/resume');      // 简历路由
let Release = require('./routes/Release');  // 发布职位路由
let about = require('./routes/about');      // 公司介绍路由
let welfare = require('./routes/welfare');  // 福利薪酬路由
let contact = require('./routes/contact');  // 联系我们路由

let db = require('./db')//引入数据库操作模块

let app = express();

// 设置模板引擎
// 设置模板的存放目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
app.engine('html',require('ejs').__express);

// 如果 /public 目录下面有favicon.ico收藏夹图标就显示下面这条
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));// 记录访问日志的
app.use(bodyParser.json());//处理JSON请求体
app.use(bodyParser.urlencoded({ extended: false }));//处理表单序列化urlencoded请求体
app.use(cookieParser());//处理cookie
app.use(express.static(path.join(__dirname, 'public')));//处理静态文件

let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let flash = require('connect-flash');

//使用会话中间件
app.use(session({
    secret: settings.cookieSecret,//指定加密的秘钥
    resave:true,//每次请求结束后都会重新保存session
    saveUninitialized:true,//保存未初始化的session
    store: new MongoStore({//指定会话存储的数据库
        url:settings.url,//指定数据库的url
    })
}));

app.use(flash());

app.use(function(req,res,next){
    res.locals.user = req.session.user;//把会话中的user赋值给模板变量
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

app.use('/', Index);            // 指定首页路由
app.use('/user', user);         // 指定用户路由
app.use('/social', social);     // 指定职位列表路由
app.use('/resume', resume);     // 指定简历路由
app.use('/Release', Release);   // 指定发布简历路由
app.use('/about', about);       // 指定关于我们路由
app.use('/welfare', welfare);   // 指定福利薪酬路由
app.use('/contact',contact);     // 指定联系我们路由

// 返回404错误页面
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发错误处理的时候，将会打印堆栈信息
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // 生产环境 线上正式环境 错误处理
    // 不向用户暴露堆栈信息
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
