import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    image : String,
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
    isVerified: {
       type: Boolean,
       default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    projects : [
       { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
        }
    ],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;