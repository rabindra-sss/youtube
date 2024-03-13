import express from "express";
import { addcomment, deletecomment, getcomment } from "../controllers/commentController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const commentRouter = express();

commentRouter.post('/', authUser, addcomment);
commentRouter.delete('/delete/:id', authUser, deletecomment);
commentRouter.get('/:videoId',  getcomment);


export default commentRouter;