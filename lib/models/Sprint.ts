const sprintSchema = new Schema({
  name: { type: String, required: true }, 
  startDate: { type: Date, required: true }, 
  endDate: { type: Date, required: true }, 
  goals: { type: String, required: true }, 
  status: { type: String, enum: ['Planned', 'Active', 'Completed'], default: 'Planned' }, 
  backlog: [{ type: Schema.Types.ObjectId, ref: 'Task' }], 
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], 
  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }], 
  completedAt: { type: Date } 
}, { timestamps: true });

const Sprint = mongoose.model('Sprint', sprintSchema);
module.exports = Sprint;
