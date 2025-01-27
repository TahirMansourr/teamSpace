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
      ref: 'Project', 
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
    sprints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint', 
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductBacklog = mongoose.models.ProductBacklog || mongoose.model("ProductBacklog", productBacklogSchema);
export default ProductBacklog;
