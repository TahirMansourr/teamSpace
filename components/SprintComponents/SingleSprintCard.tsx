import { SprintDto } from "@/Utils/types";
import { Avatar, Badge, Tooltip } from "@mantine/core";
import { IconCalendar, IconCheckbox, IconUsers } from "@tabler/icons-react";
import React from "react";
import { useSprintContext } from "../Contexts/SprintContext";

const SingleSprintCard = ({ sprint }: { sprint: SprintDto }) => {
  const { handleSprintClick } = useSprintContext();
  return (
    <div
      key={sprint._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 m-2 min-w-fit hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
    >
      <Badge
        className="absolute -top-2 -right-2"
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

      <div className="flex items-center mb-4">
        <h3 className="font-medium text-lg text-indigo-600">{sprint.name}</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {sprint.goal}
      </p>
      <div className="flex items-center gap-2">
        <Tooltip label="Start Date">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
            <IconCalendar className="text-indigo-500" size={18} />
            <p className="font-bold">Start Date</p>
            <div className="font-bold">
              {new Date(sprint.startDate).toLocaleDateString()}
            </div>
          </div>
        </Tooltip>

        <div className="grid grid-cols-2 gap-4">
          <Tooltip label="Sprint Duration">
            <Badge size="lg" radius={"md"}>
              {Math.ceil(
                (new Date(sprint.endDate).getTime() -
                  new Date(sprint.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </Badge>
          </Tooltip>
        </div>
      </div>

      <Tooltip label="Backlog Items">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg w-fit">
          <IconCheckbox className="text-indigo-500" size={18} />
          <div className="font-bold">
            {sprint.backlogItems?.length || 0} items
          </div>
        </div>
      </Tooltip>

      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg mt-4">
        <IconUsers className="text-indigo-500" size={18} />
        <span className="font-bold">
          {sprint.assignees?.length || 0} members
        </span>

        <div className="flex items-center -space-x-2">
          {sprint.assignees?.map((member) => (
            <Tooltip key={member._id} label={member.username}>
              <Avatar
                src={member.image}
                radius="xl"
                size="md"
                alt={member.username}
              />
            </Tooltip>
          ))}
        </div>
      </div>

      <button
        className=" mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors duration-300"
        onClick={(e) => {
          e.stopPropagation();
          handleSprintClick(sprint);
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default SingleSprintCard;
