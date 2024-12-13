import mongoose from "mongoose";

const productBacklogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project', // Reference to the associated project
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    backlogItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductBacklogItem', 
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductBacklog = mongoose.model('ProductBacklog', productBacklogSchema);

module.exports = ProductBacklog;
