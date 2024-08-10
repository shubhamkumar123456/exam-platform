
const { response } = require('express');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const createUser = async(req,res)=>{
    const {name,email,password} = req.body
    if(!name){
        return res.json({msg:"name is required",success:false})
    }
    if(!email){
        return res.json({msg:"email is required",success:false})
    }
    if(!password){
        return res.json({msg:"password is required",success:false})
    }
    try {
        const existingUser = await User.findOne({email})
        console.log(existingUser)
    if(!existingUser){
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password,salt)
        let user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.json({msg:"user created successfully",success:true})
    }
    else{
        return res.json({msg:"user already exists",success:false})
    }
    } catch (error) {
        return res.json({msg:"error in creating user",success:false,error})
    }
}

const loginUSer = async(req,res)=>{
        let  {email,password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            const passwordChek = await bcrypt.compareSync(password,existingUser.password)
            if(passwordChek){
                return res.json({msg:"user login successfully",success:true,user:existingUser})
            }
            else{
                return res.json({msg:"wrong password",success:false})
            }
        }else{
            return res.json({msg:"user not exists",success:false})
        }
}

const getSingle = async(req,res)=>{
    let user = await User.findById(req.params._id);
    res.json({msg:"fetched successfully",success:true,user})
}

module.exports = {
    createUser: createUser,
    loginUSer: loginUSer,
    getSingle
}