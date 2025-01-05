'use server'
import { BackLogItemDto } from "@/Utils/types";
import ProductBacklog from "../models/ProductBacklog";
import Sprint from "../models/Sprint";
import { connectToDB } from "../mongoose";

type CreateSprintType = {
    name: string;
    startDate: Date;
    endDate: Date;
    goal: string;
    status: string;
    backlog: string;
    createdBy: string;
    backlogItems?: BackLogItemDto[];
}

export async function CreateSprint (sprint:CreateSprintType )  {
    try {
        await connectToDB();
        const newSprint = await Sprint.create(sprint);
        const requiredBacklog = await ProductBacklog.findById(sprint.backlog);
        if(!requiredBacklog) {
            return {
                success: false,
                message: "Backlog not found"
            }
        }
        requiredBacklog.sprints.push(newSprint._id);
        await requiredBacklog.save();
        return {
            success: true,
            message: "Sprint created successfully",
            data: JSON.parse(JSON.stringify(newSprint))
        }
    } catch (error : any) {
        console.log(error.message);
        return {
            success: false,
            message: error.message
        }
    }
}

export async function GetAllSprints  (backlogId: string) {
    try {
        await connectToDB();
        const sprints = await Sprint.find({ backlog: backlogId }).sort({ createdAt: -1 });
        
        return {
            success: true,
            message: "Sprints fetched successfully",
            data: JSON.parse(JSON.stringify(sprints))
        }
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.message
        }
    }
}