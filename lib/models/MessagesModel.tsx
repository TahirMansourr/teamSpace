import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body : String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : Date,
    project :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    }
})

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)
export default Message