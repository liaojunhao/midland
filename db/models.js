//编写schema 数据库的骨架
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    //用户集合
    User:{
        username:{type:String,required:true},
        password:{type:String,required:true},
        email:{type:String,required:true},
        resume:{type:ObjectId,ref:'Resume'}
    },
    //简历集合
    Resume:{
        user:{type:ObjectId,ref:'User'},
        title:{type:String,required:true},
        content:{type:String,required:true},
        createAt:{type:Date,default:Date.now()}
    }
}