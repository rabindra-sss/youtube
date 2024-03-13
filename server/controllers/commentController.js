import mongoose from 'mongoose'
import commentModel from '../model/commentModel.js';
import videoModel from '../model/videoModel.js';
import { createError } from '../error.js';

export const addcomment= async (req,res)=>{
    const {videoId,content}= req.body;
    //validation
    if(!videoId||!content) {
        console.log("provide all")
    }
    const newcomment= new commentModel({...req.body, userId: req.user.id});
    const savedcomment= await newcomment.save()
    res.status(200).send({
        savedcomment
    })
}
export const deletecomment= async (req,res,next)=>{
    
    
    const comment= await commentModel.findById({_id: req.params.id});
    const video= await videoModel.findById({_id: comment.videoId});

    if(!comment) return next(createError(404, 'comment not found'))

    console.log(comment.userId);
    console.log(req.user.id)
    console.log(video.userId)
    if(req.user.id===comment.userId || req.user.id=== video.userId) {await comment.deleteOne();}
    else{
        return next(createError(403,'you are not authorized to delete this comment'))
    }
    
    res.status(200).send({
        success: true,
        message: 'comment deleted successfully',
    })
}
export const getcomment= async (req,res)=>{
    
    try
    {const videoId= req.params.videoId;
    const comments= await commentModel.find({videoId: videoId});

    res.status(200).send({
        comments
    })}
    catch(err){
        throw(err)
    }
}