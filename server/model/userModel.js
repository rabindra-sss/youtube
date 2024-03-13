import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, 'can not create channel without username']
    },
    userId:{
        type: String,
        required: [true,'userId is required'],
        unique: [true,'userId must be unique']
    },
    email:{
        type: String,
        required: [true,'email is required'],
        unique: [true,'email must be unique']
    },
    password:{
        type: String,
        required: [true,'password is required']
    },
    img:{
        type: String,
        default:""
    },
    subscribers:{
        type: Number,
        default: 0
    },
    subscribedChannels:{
        type: [String],
        default: []
    }
},{timestamps: true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt)
})
UserSchema.methods.comparepassword= async function(inputpassword){
    const ismatch= await bcrypt.compare(inputpassword,this.password);
    return ismatch;
}
export default mongoose.model('user', UserSchema);