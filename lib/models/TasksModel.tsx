import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name : String,
    description : String,
    status : String,
    priority : String,
    dueDate : Date,
    creationDate : {type :Date , default : new Date()},
    lastModified : Date,
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
    subTasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    }],
    dependencies : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    }]
})

const Task = mongoose.models.Task || mongoose.model('Task' , taskSchema)
export default Task;

// Task ID: Unique identifier for each task.
// Title: Short, descriptive name of the task.
// Description: Detailed information about the task.
// Status: Current status of the task (e.g., To Do, In Progress, Done).
// Priority: Importance level of the task (e.g., Low, Medium, High).
// Due Date: Deadline for the task completion.
// Creation Date: Date when the task was created.
// Last Modified Date: Date when the task was last updated.
// Additional Fields
// Assigned To: The person or team responsible for the task.
// Created By: The person who created the task.
// Tags/Labels: Keywords or categories associated with the task.
// Attachments: Files or documents related to the task.
// Comments: Notes or feedback from users about the task.
// Subtasks: Smaller tasks that need to be completed as part of the main task.
// Dependencies: Other tasks that must be completed before this task can be started or completed.