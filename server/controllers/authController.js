import mongoose from 'mongoose'
import userModel from '../model/userModel.js';
import bcrypt from 'bcryptjs'
import { createError } from '../error.js';
import jwt from 'jsonwebtoken'
export const signup = async (req,res,next)=>{
    
    try 
    {const {userName,userId,email,password}= req.body;
    //validation
    if(!userName||!userId||!email||!password) {
        next("provide all")
    }
    
    const user= userModel(req.body);

    await user.save();

    res.status(200).send({
        success: true,
        message: 'user created successfully',
        user:{
            userName: user.userName,
            userId: user.userId,
            email: user.email
        }
    })}
    catch(err) {
        console.log('error in signup controller')
        console.log(err)
        next(err)
    }
}
// log in
export const signin= async (req,res,next)=>{
    
    try
    {
    const {email}= req.body;
    //validation
    if(!email||!req.body.password) {
        next("provide all")
    }
    // logic
    const user= await userModel.findOne({email});
    if(!user) {return next(createError(404,"user not found"))}
    
    const ismatch= await user.comparepassword(req.body.password);
    console.log(ismatch)
    if(!ismatch) {return next(createError(400, "wrong credentials"))}
    
    const token= jwt.sign({id: user._id}, process.env.JWT_KEY);
    
    const {password, ...others}= user._doc;
    
    res.cookie("access_token", token, {httpOnly: true}).status(200).send({
        success: true,
        message: 'logged in successfully',
        user: others
    })
    }
    catch(err){
        throw(err);
        // const error= createError(404,"could not found user");
        // next(error);
    }
}