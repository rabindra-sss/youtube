import express from 'express'
import { deleteUser, getUser, likeVideo, subscribeUser, dislikeVideo, unsubscribeUser, updateUser, unlikeVideo, unDislikeVideo, likeComment, unlikeComment, dislikeComment, unDislikeComment } from '../controllers/userController.js';
import { authUser } from '../middlewares/authMiddleware.js';

const userRouter= express();
//update user
userRouter.put('/update-user/:id',authUser, updateUser)

//delete user
userRouter.delete('/delete-user/:id',authUser, deleteUser)

//get a user
userRouter.get('/find/:id', getUser)

//subscribe a user
userRouter.put('/subscribe/:id',authUser, subscribeUser)

// unsubscribe a user
userRouter.put('/unsubscribe/:id',authUser, unsubscribeUser)

//
//like a video
userRouter.put('/like-video/:videoId',authUser, likeVideo)

//unlike a video
userRouter.put('/unlike-video/:videoId',authUser, unlikeVideo)

// dislike a video
userRouter.put('/dislike-video/:videoId',authUser, dislikeVideo)

// remove dislike from a video
userRouter.put('/undislike-video/:videoId',authUser, unDislikeVideo)

//
//like a comment
userRouter.put('/like-comment/:commentId',authUser, likeComment)

//unlike a comment
userRouter.put('/unlike-comment/:commentId',authUser, unlikeComment)

// dislike a comment
userRouter.put('/dislike-comment/:commentId',authUser, dislikeComment)

// remove dislike from a comment
userRouter.put('/undislike-comment/:commentId',authUser, unDislikeComment)


export default userRouter;
