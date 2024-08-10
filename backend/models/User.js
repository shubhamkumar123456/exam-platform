const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    Exam:[
        {type:mongoose.Schema.ObjectId,ref:"Exam"}
    ]
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);