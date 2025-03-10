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
    sprintId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Sprint',
  },
    tasks : [{
      type : mongoose.Schema.Types.ObjectId,
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
},{
    timestamps: true,
  }
);

const ProductBacklogItem = mongoose.models.ProductBacklogItem || mongoose.model('ProductBacklogItem', productBacklogItemSchema);

export default  ProductBacklogItem;
