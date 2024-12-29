export const getInitialBacklogPrompt = (projectDescription : string) => {

    return `You are an expert product manager. Your task is to generate 
    a comprehensive backlog based on the user's description of their project. 
   
    my backend schema is as follows: 
    import mongoose, { Schema } from 'mongoose';
    const itemTypes = ['Feature', 'Bug', 'Technical Debt', 'Improvement', 'Spike'];
    const priorityLevels = ['High', 'Medium', 'Low'];

const productBacklogItemSchema = new Schema(
 {
   title: {
     type: String,
     required: true,
     trim: true,
   },
   description: {
     type: String,
     trim: true,
   },
   type: {
     type: String,
     enum: itemTypes,
     required: true,
   },
   priority: {
     type: String,
     enum: priorityLevels,
     required: true, 
   },
   status: {
     type: String,
     enum: ['To Do', 'In Progress', 'Done'],
     default: 'To Do',
   },
   estimatedEffort: {
     type: Number, 
   },
   acceptanceCriteria : { type : String },
   assignee: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
   }],
   createdAt: {
     type: Date,
     default: Date.now,
   },
   updatedAt: {
     type: Date,
     default: Date.now,
   },
   groupId: {
     type: String,
     default: null,
   },
   groupName: {
     type: String,
     default: null,
   },
 },
 {
   timestamps: true,
 }
);
The backlog should be in the following JSON format that has an array of objects with the following fields: title, description, type, priority, status, estimatedEffort, acceptanceCriteria, assignee, createdAt, updatedAt, groupId, groupName. without the createdAt and updatedAt fields.
 and the updatedAt field should be the current date and time but don't give them back in the response. make sure the output you give is in JSON format.
The user's description is as follows: '${projectDescription}'. Prioritize user-centric stories and actionable tasks. Generate at least 5 backlog items.`
}
