'use server';

import { BackLogItemDto } from "@/Utils/types";
import ProductBacklog from "../models/ProductBacklog";
import ProductBacklogItem from "../models/ProductBackLogItem";
import { connectToDB } from "../mongoose";
import Project from "../models/ProjectModel";

export async function GetProductBackLogAndPopulate(projectId : string) {
  try {
    await connectToDB();

    const productBacklogs = await ProductBacklog.find({ projectId }) 
      .populate({
        path : 'backlogItems',
        model: ProductBacklogItem,
        populate: {
          path: 'assignee',
          model: 'User',
        }
      }) 
      .exec();

      if(!productBacklogs || Array.isArray(productBacklogs) && productBacklogs.length === 0) {
        return {
          result : null
        }
      }
      console.log("🚀 ~ file: ProductBackLogActions.ts:11 ~ productBacklogs:", productBacklogs)
    const result = JSON.parse(JSON.stringify(productBacklogs));
    return {result};
  } catch (error) {
    console.error("Error fetching and populating product backlogs:", error);
    throw error;
  }
}

export async function CreateProductBackLog(projectId : string, name? : string , description? : string ) {
  try {
    await connectToDB();

    const backlogCount = await ProductBacklog.countDocuments({ projectId });
    const backlogName = name ?? `Untitled ${backlogCount + 1}`;
    const backlogDescription = description ?? "This is a new product backlog.";

    const newBackLog = await ProductBacklog.create({
      name: backlogName,
      projectId,
      description: backlogDescription,
    });

    await Project.findByIdAndUpdate(projectId, {
      $push: { backLogs: newBackLog._id },
    });

    const backlogObject = JSON.parse(JSON.stringify(newBackLog));

    return { message:`${backlogName} created` , backLog: backlogObject };
  } catch (error) {
    console.error("Error creating product backlog:", error);
    throw error;
  }
}

export async function RearrangeProductBackLogItem(backlogId: string, backLogs : string[]) {
  try {
    await connectToDB()
    const requiredBackLog = await ProductBacklog.findById(backlogId)
        if(!requiredBackLog) return ({status: 'Fail', message: 'Sorry this user does not exist anymore', backLog: {}})

          requiredBackLog.backlogItems = backLogs
          await requiredBackLog.save()

          const res = JSON.parse(JSON.stringify(requiredBackLog))
          return ({status: 'success', message: 'Backlog item rearranged successfully', backLog: res})
  }catch (error) {
    throw new Error (`Failed to rearrange product backlog item: ${error}`);
  }}

 
  export async function DeleteBackLog(backLogId : string) {
    try {
      await connectToDB()
      const backLogItem = await ProductBacklog.findById(backLogId)
      if(!backLogItem) return ({status: 'Fail', message: 'Sorry this user does not exist anymore', backLog: {}})

      await ProductBacklog.findByIdAndDelete(backLogId)
      return ({status: 'success', message: 'Backlog item deleted successfully', backLog: {}})
    } catch (error) {
      throw new Error (`Failed to delete product backlog item: ${error}`);
    }
  }