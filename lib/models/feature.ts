import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    docs : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doc'
    },
    createdAt : Date,
    tasks : [{
        type :  mongoose.Schema.Types.ObjectId ,
        ref : 'Task'
    }],
    issues : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Issue'
    }],
    notes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Note'
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Feature = mongoose.models.Feature || mongoose.model('Feature' , featureSchema)
export default Feature