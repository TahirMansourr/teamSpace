import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    folder : String,
    docs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SingleDoc'
    }],
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doc'
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    createdAt : Date,
   
})


const Doc = mongoose.models.Doc || mongoose.model('Doc' , docSchema)
export default Doc;

