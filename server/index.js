import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute.js';
import videoRouter from './routes/videoRoute.js';
import commentRouter from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';

const app = express();
app.use(cookieParser());
app.use(express.json())
dotenv.config();

const connect= ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected to mongodb databse")
    })
    .catch((err)=>{
        throw err;
        console.log("couldn't connect to db")
    })
}

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/video',videoRouter);
app.use('/api/v1/comment',commentRouter);
app.use('/api/v1/user',userRouter);

app.use((err,req,res,next)=>{
    const status= err.status || 500;
    const message= err.message|| 'something went wrong'
    //dev
    if(process.env.DEV_MODE== 'development')
    res.status(status).send({
        success: false,
        message,
    });
    //prod
})

app.listen(8800,()=>{
    connect();
    console.log('app is connected in port 8800')
})