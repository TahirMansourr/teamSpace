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
    backlogItems?: string[];
}

export const CreateSprint = async (sprint:CreateSprintType ) => {
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