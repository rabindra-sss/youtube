import mongoose from "mongoose";
import userModel from "../model/userModel.js";
import { createError } from "../error.js";
import videoModel from "../model/videoModel.js";
import commentModel from "../model/commentModel.js";
export const updateUser = async (req, res, next) => {

    try {
        if (req.params.id !== req.user.id) {
            return next(createError(401, 'user is not authenticated'));
        }


        const id = req.user.id;


        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });
        console.log('k')
        const { password, ...others } = updatedUser._doc;

        res.send({
            success: true,
            message: 'user updated successfully',
            user: others
        })
    }
    catch (err) {
        next(createError(403, "you can update only your account"))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) {
            return next(createError(401, 'user is not authenticated'));
        }


        const id = req.user.id;


        await userModel.findByIdAndDelete(req.params.id);

        res.send({
            success: true,
            message: 'user deleted successfully',
        })
    }
    catch (err) {
        throw (err)
    }
}
export const getUser = async (req, res, next) => {

    try {
        const user = await userModel.findOne({ userId: req.params.id });
        if (!user) return next(createError(401, "no user found"))
        const { password, ...others } = user._doc;
        res.status(200).send({
            user: others
        })
    }
    catch (err) {
        throw (err)
    }
}

export const subscribeUser = async (req, res, next) => {

    try {

        // const user = await userModel.findById(req.user.id);

        // const targetuser = await userModel.findById(req.params.id);
        // if (!targetuser) return next(createError(404, "could not perform this action"));
        // console.log(targetuser)

        // user.subscribedChannels.push(targetuser._id);
        // const n = parseInt(targetuser.subscribers);
        // targetuser.subscribers = n + 1;

        // const updateduser = await userModel.findByIdAndUpdate(req.user.id, { $set: user }, { new: true });
        // const updatedtarget = await userModel.findByIdAndUpdate(req.params.id, { $set: targetuser }, { new: true })

        const updatedtargetuser = await userModel.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        }, {new: true});
        if (!updatedtargetuser) return next(createError(404, "could not perform this action"));

        const updateduser = await userModel.findByIdAndUpdate(req.user.id, {
            $push: {subscribedChannels: req.params.id}
        }, {new: true});

        res.status(200).send({
            success: true,
            message: "subscribed",
            updateduser,
            targetusersubscribers: updatedtargetuser.subscribers,

        })
    }
    catch (err) {
        throw (err)
    }
}
export const unsubscribeUser = async (req, res, next) => {
    try {
        const updatedtargetuser = await userModel.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        }, {new: true});

        if (!updatedtargetuser) return next(createError(404, "could not perform this action"));

        const updateduser = await userModel.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedChannels: req.params.id}
        }, {new: true});

        res.status(200).send({
            success: true,
            message: "unsubscribed",
            updateduser,
            targetusersubscribers: updatedtargetuser.subscribers,
            
        })
    }
    catch (err) {
        throw (err)
    }
}

// like dislike a video
export const likeVideo = async (req, res, next) => {
    try
    {const id = req.user.id;
    const videoId= req.params.videoId;

    const likedvideo = await videoModel.findByIdAndUpdate(videoId, {
        $addToSet:{likes: id},
        $pull: {dislikes: id}
    },{new: true})
    console.log(likedvideo)
    res.status(200).send(likedvideo);
    }
    catch(err){
        throw(err)
    }

}

export const dislikeVideo = async (req, res, next) => {
    try
    {const id = req.user.id;
    const videoId= req.params.videoId;

    const dislikedvideo = await videoModel.findByIdAndUpdate(videoId, {
        $addToSet:{dislikes: id},
        $pull: {likes: id}
    },{new: true})
    res.status(200).send(dislikedvideo);
    }
    catch(err){
        throw(err)
    }
}
export const unlikeVideo = async (req, res, next) => {
    try
    {const id = req.user.id;
    const videoId= req.params.videoId;

    const unlikedvideo = await videoModel.findByIdAndUpdate(videoId, {
        $pull:{likes: id},
    },{new: true})
    res.status(200).send(unlikedvideo);
    }
    catch(err){
        throw(err)
    }

}
export const unDislikeVideo = async (req, res, next) => {
    try
    {const id = req.user.id;
    const videoId= req.params.videoId;

    const undislikedvideo = await videoModel.findByIdAndUpdate(videoId, {
        $pull: {dislikes: id}
    },{new: true})
    res.status(200).send(undislikedvideo);
    }
    catch(err){
        throw(err)
    }

}

// like dislike a comment
export const likeComment = async (req, res, next) => {
    try
    {const id = req.user.id;
    const commentId= req.params.commentId;

    const likedComment = await commentModel.findByIdAndUpdate(commentId, {
        $addToSet:{likes: id},
        $pull: {dislikes: id}
    },{new: true})
    console.log(likedComment)
    res.status(200).send(likedComment);
    }
    catch(err){
        throw(err)
    }

}

export const dislikeComment = async (req, res, next) => {
    try
    {const id = req.user.id;
    const commentId= req.params.commentId;

    const dislikedComment = await commentModel.findByIdAndUpdate(commentId, {
        $addToSet:{dislikes: id},
        $pull: {likes: id}
    },{new: true})
    res.status(200).send(dislikedComment);
    }
    catch(err){
        throw(err)
    }
}
export const unlikeComment = async (req, res, next) => {
    try
    {const id = req.user.id;
    const commentId= req.params.commentId;

    const unlikedComment = await commentModel.findByIdAndUpdate(commentId, {
        $pull:{likes: id},
    },{new: true})
    res.status(200).send(unlikedComment);
    }
    catch(err){
        throw(err)
    }

}
export const unDislikeComment = async (req, res, next) => {
    try
    {const id = req.user.id;
    const commentId= req.params.commentId;

    const undislikedComment = await commentModel.findByIdAndUpdate(commentId, {
        $pull: {dislikes: id}
    },{new: true})
    res.status(200).send(undislikedComment);
    }
    catch(err){
        throw(err)
    }

}