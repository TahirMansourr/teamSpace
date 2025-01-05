"use client";
import { SprintDto } from "@/Utils/types";
import { Badge, Progress, Tooltip } from "@mantine/core";
import {
  IconCalendar,
  IconFlag,
  IconUsers,
  IconCheckbox,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface SingleSprintPreviewProps {
  sprint: SprintDto;
}

const SingleSprintPreview: React.FC<SingleSprintPreviewProps> = ({
  sprint,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center mb-6 transition-all duration-500 delay-100 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {sprint.name}
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
        >
          {sprint.status}
        </Badge>
      </div>

      {/* Sprint Goal */}
      <div
        className={`mb-6 transition-all duration-500 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <IconFlag size={20} className="text-indigo-500" />
          Sprint Goal
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{sprint.goal}</p>
      </div>

      {/* Progress Section */}
      <div
        className={`mb-6 transition-all duration-500 delay-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
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

      {/* Info Grid */}
      <div
        className={`grid grid-cols-2 gap-4 mb-6 transition-all duration-500 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
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

        <Tooltip label="Backlog Items">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <IconCheckbox className="text-indigo-500" size={20} />
            <div>
              <div className="text-sm text-gray-500">Items</div>
              <div className="font-medium">
                {sprint.backlogItems?.length || 0} items
              </div>
            </div>
          </div>
        </Tooltip>
      </div>

      {/* Team Members */}
      <div
        className={`transition-all duration-500 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <IconUsers size={20} className="text-indigo-500" />
          <span className="font-medium">Team Members</span>
        </div>
        <div className="flex -space-x-2 mt-2">
          {sprint.assignees?.map((member, index) => (
            <Tooltip key={member._id} label={member.username}>
              <img
                src={member.image}
                alt={member.username}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                style={{ zIndex: sprint.assignees!.length - index }}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleSprintPreview;
