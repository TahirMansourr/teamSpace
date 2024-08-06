import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    body : [{
        title : String ,
        content : String
    }],
    edits : [{
        editedBy : { 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        editedAt : Date,
        editedContent : String
    }]
})

const Doc = mongoose.models.Doc || mongoose.model('Issue' , docSchema)
export default Doc;
