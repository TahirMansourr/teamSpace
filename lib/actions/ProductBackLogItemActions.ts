'use server'

import ProductBacklog from "../models/ProductBacklog";
import { connectToDB } from "../mongoose"

type ProductBackLogItem = {
  productBacklogId: string;
  title: string;
  description: string;
  type: 'Feature' | 'Bug' | 'Technical Debt' | 'Improvement' | 'Spike';
  priority: number;
  status: 'To Do' | 'In Progress' | 'Done';
  estimatedEffort: number;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
}


export async function CreateProductBackLogItem(productBackLogItem: ProductBackLogItem) {
  try {
    await connectToDB()

    await ProductBacklog.findOneAndUpdate(
      { _id: productBackLogItem.productBacklogId },
      {
        $push: {
          backlogItems: productBackLogItem
        }
      },
      { new: true }
    );

  } catch (error) {
    
  }
}