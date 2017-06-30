var mongoose = require('mongoose');
mongoose.Promise = Promise;//用ES6自带的Promise替换掉mongoose自带的promise库
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var settings = require('../settings');//引入数据库设置

//链接数据库
mongoose.connect(settings.url);

//定义用户的Schema 定义文档的属性名和属性的类型
let UserSchema = new Schema({
    //注意如果信息填写不完整session是不会存储ID号的
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    resume:{type:ObjectId,ref:'Resume'},
    avatar:{type:String}

});
let User = mongoose.model('User',UserSchema);// 定义用户模型
exports.User = User;// 导出用户模型

//定义简历的Schema
let ResumeSchema = new mongoose.Schema({
    name:{type:String,required:true},     //名字
    gender:{type:String,required:true},   //性别
    birthday:{type:Date},                 //出生时间
    work_from_param:{type:Date},          //参加工作时间
    address_city:{type:String},           //所属城市
    marital_status:{type:Boolean},        //婚姻状态
    mobile:{type:Number},                 //手机
    email:{type:String},                  //邮箱
    qq:{type:Number},                     //qq
    user:{type:ObjectId,ref:'User'}       //成为一个外键
});

let Resume = mongoose.model('Resume',ResumeSchema);// 定义简历模型
exports.Resume = Resume;// 导出简历模型


//定义发布职位的Schema
let PositionSchema = new mongoose.Schema({
    name:{type:String,required:true},
    group:{type:String,required:true},     //组别
    category:{type:String,required:true},  //类别
    place:{type:String,required:true},     //地点
    num:{type:Number,required:true},
    time:{type:Date,default:Date.now()},
    Duty:{type:String,required:true},   //岗位职责
    Ask:{type:String,required:true},    //岗位要求
    Stat:{type:[ObjectId],ref:'User'}
})

let Position = mongoose.model('Position',PositionSchema);//定义职位模型
exports.Position = Position;// 导出职位模型






