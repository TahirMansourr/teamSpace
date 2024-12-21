'use server'

import ProductBacklog from "../models/ProductBacklog";
import ProductBacklogItem from "../models/ProductBackLogItem";
import { connectToDB } from "../mongoose"

type ProductBackLogItem = {
  title: string;
  description: string;
  type: 'Feature' | 'Bug' | 'Technical Debt' | 'Improvement' | 'Spike';
  priority: 'High' | 'Medium' | 'Low';
  status: "To Do" | "In Progress" | "Done" | "Review";
  estimatedEffort: number;
  acceptanceCriteria: string;
  assignee: string[];
  backlogId: string;
}

type UpdateProductBackLogItem = ProductBackLogItem & {
  itemId: string;
}

export async function CreateProductBackLogItem(productBackLogItem: ProductBackLogItem) {
  try {
    await connectToDB();

    const { backlogId, ...itemData } = productBackLogItem;

    // Create new backlog item
    const newBacklogItem = await ProductBacklogItem.create({
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const updatedBacklog = await ProductBacklog.findByIdAndUpdate(
      backlogId,
      {
        $push: { backlogItems: newBacklogItem._id },
        updatedAt: new Date()
      },
      { new: true }
    );

    const itemres = JSON.parse(JSON.stringify(newBacklogItem));
    const backlogres = JSON.parse(JSON.stringify(updatedBacklog));
    return { success: true, item: itemres, backlog: backlogres };

  } catch (error) {
    throw new Error (`Failed to create product backlog item: ${error}`);
  }
}

export async function UpdateProductBackLogItem(productBackLogItem: UpdateProductBackLogItem) {
  try {
    await connectToDB();

    const { itemId, ...itemData } = productBackLogItem;

    // Update backlog item
    const updatedBacklogItem = await ProductBacklogItem.findByIdAndUpdate(
      itemId,
      {
        ...itemData,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedBacklogItem) {
      throw new Error('Backlog item not found');
    }

    const itemres = JSON.parse(JSON.stringify(updatedBacklogItem));
    return { success: true, item: itemres };

  } catch (error) {
    throw new Error(`Failed to update product backlog item: ${error}`);
  }
}
