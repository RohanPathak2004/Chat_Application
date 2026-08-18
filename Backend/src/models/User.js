import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    fullName: {
        type:String,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        minLength:6,
        trim:true
    },
    profilePic: {
        type:String,
        default:""
    }
},{timestamps:true}
) // created At or Updated At

const User = mongoose.model("User",userSchema);

export default User;