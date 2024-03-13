import express from "express";
import { signup, signin } from "../controllers/authController.js";

const authRouter = express();
// sign up
authRouter.post('/signup',signup);
// sign in
authRouter.post('/signin',signin);
//google auth
export default authRouter;