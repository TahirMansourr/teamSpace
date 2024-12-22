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

type GroupUpdate = {
  backlogId: string;
  groups: {
    [key: string]: {
      name: string;
      items: string[];
    };
  };
};

type GroupCreate = {
  backlogId: string;
  groupId: string;
  name: string;
  items: string[];
};

type GroupAction = {
  backlogId: string;
  groupId: string;
  name?: string;
  itemId?: string;
};

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

export async function UpdateProductBackLogItemGroups({ backlogId, groups }: GroupUpdate) {
  try {
    await connectToDB();

    // First, clear all existing group assignments
    await ProductBacklogItem.updateMany(
      { productBacklogId: backlogId },
      { $set: { groupId: null, groupName: null } }
    );

    // Then update items with their new group assignments
    for (const [groupId, group] of Object.entries(groups)) {
      await ProductBacklogItem.updateMany(
        {
          _id: { $in: group.items },
          productBacklogId: backlogId
        },
        {
          $set: {
            groupId,
            groupName: group.name
          }
        }
      );
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update product backlog item groups: ${error}`);
  }
}

export async function CreateProductBackLogItemGroup({ backlogId, groupId, name, items }: GroupCreate) {
  try {
    await connectToDB();

    console.log("Attempting to create group with:", {
      backlogId,
      groupId,
      name,
      itemCount: items.length
    });

    // Update all items in the group
    const updateResult = await ProductBacklogItem.updateMany(
      {
        _id: { $in: items }
      },
      {
        $set: {
          groupId,
          groupName: name,
          productBacklogId: backlogId
        }
      }
    );

    console.log("Update result:", updateResult);

    // Find all updated items
    const updatedItems = await ProductBacklogItem.find({
      _id: { $in: items }
    });

    console.log("Found items:", {
      expected: items.length,
      found: updatedItems.length,
      items: updatedItems.map(item => ({
        id: item._id,
        groupId: item.groupId,
        groupName: item.groupName,
        productBacklogId: item.productBacklogId
      }))
    });

    // Verify the items exist (relaxed verification)
    if (updatedItems.length === 0) {
      throw new Error('No items were found to group');
    }

    return { 
      success: true,
      groupId,
      name,
      items: updatedItems
    };
  } catch (error) {
    console.error("Group creation error:", error);
    throw new Error(`Failed to create product backlog item group: ${error}`);
  }
}

export async function RenameProductBackLogItemGroup({ backlogId, groupId, name }: GroupAction) {
  try {
    await connectToDB();
    console.log("🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱 Renaming group:", { backlogId, groupId, name });
    // Update all items in the group with the new name
    const updateResult = await ProductBacklogItem.updateMany(
      {
        groupId: groupId
      },
      {
        $set: {
          groupName: name
        }
      }
    );

    if (updateResult.matchedCount === 0) {
      throw new Error('No items found in this group');
    }

    return { success: true };
  } catch (error) {
    console.error("Group rename error:", error);
    throw new Error(`Failed to rename product backlog item group: ${error}`);
  }
}

export async function RemoveItemFromGroup({ backlogId, groupId, itemId }: GroupAction) {
  try {
    await connectToDB();

    const updateResult = await ProductBacklogItem.updateOne(
      {
        _id: itemId,
        groupId: groupId
      },
      {
        $set: {
          groupId: null,
          groupName: null
        }
      }
    );

    if (!updateResult.matchedCount) {
      throw new Error('Item not found in group');
    }

    return { success: true };
  } catch (error) {
    console.error("Remove item from group error:", error);
    throw new Error(`Failed to remove item from group: ${error}`);
  }
}

export async function DeleteProductBackLogItemGroup({ backlogId, groupId }: GroupAction) {
  try {
    await connectToDB();

    // Delete all items in the group
    const deleteResult = await ProductBacklogItem.deleteMany({
      groupId: groupId
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error('No items found in this group');
    }

    return { success: true, deletedCount: deleteResult.deletedCount };
  } catch (error) {
    console.error("Group deletion error:", error);
    throw new Error(`Failed to delete product backlog item group: ${error}`);
  }
}

export async function ClearProductBackLogItemGroup({ backlogId, groupId }: GroupAction) {
  try {
    await connectToDB();

    // Remove all items from the group but keep the group structure
    const updateResult = await ProductBacklogItem.updateMany(
      {
        groupId: groupId
      },
      {
        $set: {
          groupId: null,
          groupName: null
        }
      }
    );

    if (updateResult.matchedCount === 0) {
      throw new Error('No items found in this group');
    }

    return { success: true };
  } catch (error) {
    console.error("Group clear error:", error);
    throw new Error(`Failed to clear product backlog item group: ${error}`);
  }
}

export async function DeleteProductBackLogItem(itemId: string, backlogId: string) {
  try {
    await connectToDB();

    // Delete the backlog item
    const deletedItem = await ProductBacklogItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      throw new Error('Backlog item not found');
    }

    // Remove the item reference from the backlog
    await ProductBacklog.findByIdAndUpdate(
      backlogId,
      {
        $pull: { backlogItems: itemId },
        updatedAt: new Date()
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Delete item error:", error);
    throw new Error(`Failed to delete product backlog item: ${error}`);
  }
}
