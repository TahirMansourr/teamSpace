import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    body : String,
    createdAt : Date,
    updatedAt : Date,
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
})


const Note = mongoose.models.Note || mongoose.model("Note", noteSchema)
export default Note