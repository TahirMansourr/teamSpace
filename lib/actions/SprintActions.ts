'use server'
import { BackLogItemDto } from "@/Utils/types";
import ProductBacklog from "../models/ProductBacklog";
import Sprint from "../models/Sprint";
import { connectToDB } from "../mongoose";
import ProductBacklogItem from "../models/ProductBackLogItem";
import Task from "../models/TasksModel";
import User from "../models/UserModel";
import Issue from "../models/IssuesModel";
import Note from "../models/NotesModel";

type CreateSprintType = {
    _id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    goal: string;
    status: "planned" | "active" | "completed" | "cancelled";
    backlog: string;
    createdBy: string;
    backlogItems?: string[];
    assignees?: string[];
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
        console.log("🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱Sprint created successfully");
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

export async function UpdateSprint(sprint: CreateSprintType & { _id: string }) {
    try {
        await connectToDB();
        const updatedSprint = await Sprint.findByIdAndUpdate(sprint._id, sprint, { new: true });
        return {
            success: true,
            message: "Sprint updated successfully",
            data: JSON.parse(JSON.stringify(updatedSprint))
        }
    } catch (error: any) {
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

export async function PopulateSprints(sprints : string[]){
    try {
        await connectToDB();
        const populatedSprints = await Sprint.find({ _id: { $in: sprints } }).populate({
            path: "backlogItems",
            populate: {
                path: "createdBy",
                model: "User"
            }
        });
        return {
            success: true,
            message: "Sprints fetched successfully",
            data: JSON.parse(JSON.stringify(populatedSprints))
        }
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.message
        }
    }
}

export async function GetSprintById(sprintId: string) {
    try {
        await connectToDB();
        const sprint = await Sprint.findById(sprintId).populate([{
            path: "backlogItems",
            model : ProductBacklogItem,
            populate:[ 
            {
                path : 'assignee',
                model : User
            },
        {
            path : 'tasks',
            model : Task,
            populate : [
                {
                path : 'assignedTo',
                model : User
               },
               {
                path : 'createdBy',
                model : User
            },
        ]
        },
        {
            path : 'issues',
            model : Issue,
            populate : [{
                path : 'assignedTo',
                model : User
            },
        {
            path : 'createdBy',
            model : User
        }
        ]
        },
        {
            path : 'notes',
            model : Note,
            populate : [{
                path : 'creator',
                model : User
            },
        
        ]
        },
        

        ]
        },
    {
        path : 'assignees',
        model : User
    },
{
    path : 'createdBy',
    model : User
},
// {
//     path : 'backlog',
//     model : ProductBacklog
// }
]);
        if (!sprint) {
            return {
                success: false,
                message: "Sprint not found"
            };
        }
        return {
            success: true,
            message: "Sprint fetched successfully",
            data: JSON.parse(JSON.stringify(sprint))
        };
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.message
        };
    }
}