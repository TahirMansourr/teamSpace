import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    name : String,
    description : String,
    status : String,
    priority : String,
    dueDate : Date,
    creationDate : {type :Date , default : new Date()},
    lastModified : {type :Date , default : new Date()},
    project :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    assignedTo : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }], 
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    tags : [String],
    // attatchments : string
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }],
    subIssues : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Issue'
    }],
    dependencies : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Issue'
    }]
})

const Issue = mongoose.models.Issue || mongoose.model('Issue' , issueSchema)
export default Issue;

