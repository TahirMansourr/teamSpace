import mongoose from "mongoose";

export const fileSchema = new mongoose.Schema({
    name : String,
    body : String,
    createdAt : Date,
    featureId : String,
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    edits : [{
        editedBy : { 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        editedAt : Date,
        editedContent : String,
        editedName : String
    }],
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Folder'
    }
})

const File = mongoose.models.File || mongoose.model('File' , fileSchema)
export default File;