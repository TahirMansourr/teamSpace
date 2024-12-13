const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrumSchema = new Schema({
  name: { type: String, required: true }, 
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true }, 
  description: { type: String }, 
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
  sprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }], 
  backlog: { type: Schema.Types.ObjectId, ref: 'Backlog' }, 
  features: [{ type: Schema.Types.ObjectId, ref: 'Features' }], 
  docs: [{ type: Schema.Types.ObjectId, ref: 'Docs' }], 
  notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }], 
  messaging: [{ type: Schema.Types.ObjectId, ref: 'Messages' }] 
}, { timestamps: true });

const Scrum = mongoose.model('Scrum', scrumSchema);
module.exports = Scrum;
