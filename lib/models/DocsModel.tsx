import mongoose from "mongoose";


const SingleDocSchema = new mongoose.Schema({
    title : String,
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    body : String,
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : Date,
    edits : [{
        editedBy : { 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        editedAt : Date,
        editedContent : String
    }]
})
const docSchema = new mongoose.Schema({
    folder : String,
    docs : [SingleDocSchema]
})


const Doc = mongoose.models.Doc || mongoose.model('Doc' , docSchema)
export default Doc;
