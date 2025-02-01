"use client";

import { SprintDto, BackLogItemDto } from "@/Utils/types";
import { Avatar, Badge, Progress, ScrollArea, Tooltip } from "@mantine/core";
import {
  IconCalendar,
  IconFlag,
  IconUsers,
  IconCheckbox,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSprintContext } from "../Contexts/SprintContext";
import BackLogItemInsideSprintcard from "./BackLogItemInsideSprintcard";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { CreateOrUpdateSprintModal } from "./CreateSprintModal";

interface SingleSprintPreviewProps {
  sprint: SprintDto;
}

const SingleSprintPreview: React.FC<SingleSprintPreviewProps> = ({
  sprint,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBacklogItem, setSelectedBacklogItem] = useState<BackLogItemDto | null>(null);
  const { handleBack } = useSprintContext();
  const { myBackLogs } = useBackLogContext();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculateProgress = () => {
    const completedItems =
      sprint.backlogItems?.filter((item) => item.status === "Done").length || 0;
    const totalItems = sprint.backlogItems?.length || 0;
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  const daysRemaining = () => {
    const end = new Date(sprint.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const backlogName = myBackLogs?.find(
    (backlog) => backlog._id === sprint.backlog
  )?.name;

  return (
    <div className="flex w-full ">
      {/* Left Section */}
      <div className="w-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-sm m-1 hover:shadow-md p-6 ">
        <button
          onClick={handleBack}
          className="mb-3 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-300 flex items-center gap-2 font-bold"
        >
          <IoMdArrowRoundBack size={20} />
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {backlogName} &gt; {sprint.name}
          </h2>
          <Badge
            color={
              sprint.status === "active"
                ? "green"
                : sprint.status === "planned"
                ? "blue"
                : "gray"
            }
            size="lg"
            className="mt-4"
          >
            {sprint.status}
          </Badge>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <IconFlag size={20} className="text-indigo-500" />
            Sprint Goal
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{sprint.goal}</p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Sprint Progress</span>
            <span className="text-sm text-gray-500">
              {Math.round(calculateProgress())}%
            </span>
          </div>
          <Progress
            value={calculateProgress()}
            color="indigo"
            size="lg"
            radius="xl"
          />
        </div>
        <div className="mb-6">
          <Tooltip label="Sprint Duration">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <IconCalendar className="text-indigo-500" size={20} />
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium">
                  {daysRemaining()} days remaining
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <IconUsers size={20} className="text-indigo-500" />
            {/* <span className="font-medium">Team Members</span> */}
          </div>
          <div className="flex -space-x-2 mt-2">
            {sprint.assignees?.map((member, index) => (
              <Tooltip key={member._id} label={member.username}>
                <Avatar
                  src={member.image}
                  alt={member.username}
                  size={"md"}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                  style={{ zIndex: sprint.assignees!.length - index }}
                />
              </Tooltip>
            ))}
          </div>
          <div className="ml-0">

          <CreateOrUpdateSprintModal existingSprint={sprint}/>
          </div>

        </div>
      </div>

      {/* Middle Section */}
      <ScrollArea className="w-1/2 h-[calc(100vh-6rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm m-1 hover:shadow-md p-6">
        <div className="grid grid-cols-2 gap-4 m-2">
          {sprint.backlogItems?.map((item) => (
            <div key={item._id} onClick={() => setSelectedBacklogItem(item)}>
              <BackLogItemInsideSprintcard backLogItem={item} />
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Right Section */}
      <ScrollArea className="w-1/4 bg-white h-[calc(100vh-6rem)] dark:bg-gray-800 rounded-xl shadow-sm m-1 hover:shadow-md p-6">
        {selectedBacklogItem ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <IconCheckbox size={20} className="text-indigo-500" />
              {selectedBacklogItem.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedBacklogItem.description}
            </p>
            <div className="space-y-4">
              {selectedBacklogItem.tasks?.map((task) => (
                <div key={task._id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-600 dark:text-gray-300">
            Select a backlog item to view its tasks.
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SingleSprintPreview;