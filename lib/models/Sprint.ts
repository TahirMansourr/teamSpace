import mongoose, { Schema, Document } from 'mongoose';

export interface ISprint extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  backlog: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  backlogItems: Schema.Types.ObjectId[];
  velocity?: number;
  createdAt: Date;
  updatedAt: Date;
}

const SprintSchema = new Schema<ISprint>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['planned', 'active', 'completed', 'cancelled'],
      default: 'planned',
    },
    backlog: {
      type: Schema.Types.ObjectId,
      ref: 'ProductBacklog',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    backlogItems: [{
      type: Schema.Types.ObjectId,
      ref: 'ProductBacklogItem',
    }],
    velocity: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);


const Sprint = mongoose.models.Sprint || mongoose.model("Sprint", SprintSchema);
export default Sprint;