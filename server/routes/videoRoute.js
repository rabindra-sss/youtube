import express from "express";
import { createvideo, deletevideo, getbyTag, getvideo, randomvideo, search, subscriptions, trendvideo, updatevideo } from "../controllers/videoController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const videoRouter = express();
// create video
videoRouter.post('/create',authUser,createvideo);
// delete video
videoRouter.delete('/delete/:id',authUser,deletevideo);

// update video
videoRouter.put('/update/:id',authUser,updatevideo);
//get a video
videoRouter.get('/get/:id',getvideo);
//random videos
videoRouter.get('/random',randomvideo);
//trending videos
videoRouter.get('/trend',trendvideo);
// subscribed videos
videoRouter.get('/subscriptions',authUser,subscriptions);
// get by tags
videoRouter.get('/tags',getbyTag);
//search 
videoRouter.get('/search',search);





export default videoRouter;