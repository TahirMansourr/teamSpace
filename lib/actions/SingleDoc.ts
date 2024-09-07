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
    }],
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doc'
    },
    children : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doc'
    }]
})

const SingleDoc = mongoose.models.SingleDoc || mongoose.model('SingleDoc' , SingleDocSchema)
export default SingleDoc;