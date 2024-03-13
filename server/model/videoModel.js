import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({

    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default:""
    },
    videoURL:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    tags:{
        type: [String],
        default:[]
    },
    views:{
        type: Number,
        default: 0
    },
    likes:{
        type: [String],
        default: []
    },
    dislikes:{
        type: [String],
        default: []
    }
},{timestamps: true})

export default mongoose.model('video', VideoSchema);