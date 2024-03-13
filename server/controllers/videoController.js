import mongoose from 'mongoose'
import videoModel from '../model/videoModel.js';
import userModel from '../model/userModel.js';
import { createError } from '../error.js';

// post video
export const createvideo= async (req,res, next)=>{
    try
    {const {title,videoURL,thumbnail}= req.body;
    //validation
    if(!title||!videoURL||!thumbnail) {
        console.log("provide all")
    }

    // req.body.userId= req.user.id;

    // const video= await videoModel.create(req.body);

    const newvideo= new videoModel({userId: req.user.id, ...req.body});
    await newvideo.save();

    console.log(newvideo)
    res.status(200).send({
        success: true,
        message: 'video created successfully',
        newvideo
    })}
    catch(err){
        throw(err)
    }
}
// delete video
export const deletevideo= async (req,res,next)=>{
    
    
    const video= await videoModel.findById({_id: req.params.id});
    if(!video) return next(createError(404, 'video not found'))

    console.log(video.userId);
    console.log(req.user.id)
    if(video.userId !== req.user.id) return next(createError(403,'you are not authorized to delete this video'))

    
    await video.deleteOne();
    res.status(200).send({
        success: true,
        message: 'video deleted successfully',
    })
}

// update video
export const updatevideo= async (req,res,next)=>{
    
    
    const video= await videoModel.findById({_id: req.params.id});
    if(!video) return next(createError(404, 'video not found'))

    console.log(video.userId);
    console.log(req.user.id)
    if(video.userId !== req.user.id) return next(createError(403,'you are not authorized to update this video'))

    
    const updatedvideo= await videoModel.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
    console.log(updatedvideo);
    res.status(200).send({
        success: true,
        message: 'video update successfully',
        updatedvideo
    })
}

// get a video
export const getvideo= async (req,res)=>{
    
    try
    {const video= await videoModel.findById(req.params.id);

    res.status(200).send({
        success: true,
        message: 'video get successfully',
        video
    })}
    catch(err){
        throw(err)
    }
}

// add view 
export const addview= async (req,res)=>{
    
    try
    {const video= await videoModel.findByIdAndUpdate(req.params.id, {$inc: {views: 1}});

    res.status(200).send("the view has been increased")}
    catch(err){
        throw(err)
    }
}
// get random video
export const randomvideo = async (req,res)=>{
    
    try
    {const videos= await videoModel.aggregate([{$sample:{size :40}}]);

    res.status(200).send(videos)}
    catch(err){
        throw(err)
    }
}
// trend 
export const trendvideo = async (req,res)=>{
    
    try
    {const videos= await videoModel.find().sort({views:-1});

    res.status(200).send(videos)}
    catch(err){
        throw(err)
    }
}

// subscribed videos
export const subscriptions= async (req,res)=>{
    try
    {
    const user =await userModel.findById(req.user.id);

    const subscribedChannels= user.subscribedChannels;

    const videolist = await Promise.all(subscribedChannels.map((channelId)=>{
        return videoModel.find({userId: channelId})
    }))
    console.log(videolist)

    res.status(200).send(videolist.flat().sort((a,b)=>b.createdAt-a.createdAt))}
    catch(err){
        throw(err)
    }
};

// get by tag
export const getbyTag = async (req,res)=>{
    
    try
    {
        const tags= req.query.tags;
        console.log(tags);
        const tagsArray= tags.split(",")
        console.log(tagsArray)
    
        const videos= await videoModel.find({tags: {$in: tagsArray}})
        console.log(videos)

    res.status(200).send(videos)}
    catch(err){
        throw(err)
    }
}
// search by title
export const search = async (req,res)=>{
    
    try
    {
        const query= req.query.q;
    
        const videos= await videoModel.find({title: {$regex: query, $options: 'i'}})
        console.log(videos)

    res.status(200).send(videos)}
    catch(err){
        throw(err)
    }
}
// like video
