import { useTaskContext } from "@/components/Contexts/TasksContext";
import React from "react";
import TaskCard from "./TaskCard";
import { TaskDto } from "@/Utils/types";

const TeamSpaceTask = () => {
  const { allTasks } = useTaskContext();
  return (
    <main className="flex flex-col w-full">
      {allTasks ? (
        allTasks.map((task: TaskDto) => <TaskCard task={task} key={task._id} />)
      ) : (
        <h1>No Tasks </h1>
      )}
    </main>
  );
};

export default TeamSpaceTask;
