"use client";
import { TaskDto, UserDto } from "@/Utils/types";
import { Badge, Spoiler, Avatar, Tooltip } from "@mantine/core";
import React from "react";
import { FiEdit } from "react-icons/fi";
import CreateOrUpdateTaskModal from "./CreateTaskModal";
import { useDisclosure } from "@mantine/hooks";
import { MdOutlineCalendarToday } from "react-icons/md";

const TaskCard = ({ task }: { task: TaskDto }) => {
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);
  const date = new Date(task.dueDate);
  const creationDate = new Date(task.creationDate);
  const formattedCreationDate =
    creationDate.toLocaleDateString() + " " + creationDate.toLocaleTimeString();

  return (
    <div className="w-[95%] mx-auto group mb-3">
      <div className="relative bg-white rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-lg border border-slate-200">
        {/* Priority Indicator */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl
          ${
            task.priority === "HIGH"
              ? "bg-red-500"
              : task.priority === "MEDIUM"
              ? "bg-orange-400"
              : "bg-blue-500"
          }`}
        />

        <div className="p-5 pl-7">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
            <Badge
              variant="light"
              radius="md"
              size="lg"
              className="shadow-sm"
              color={
                task.status === "To Do"
                  ? "red"
                  : task.status === "In Progress"
                  ? "yellow"
                  : task.status === "Done"
                  ? "green"
                  : task.status === "Review"
                  ? "orange"
                  : "gray"
              }
            >
              {task.status || "No Status"}
            </Badge>
          </div>

          {/* Description */}
          <Spoiler maxHeight={40} showLabel="Read more" hideLabel="Show less">
            <p className="text-gray-600 text-sm leading-relaxed">
              {task.description}
            </p>
          </Spoiler>

          {/* Due Date */}
          <div className="flex items-center gap-2 mt-4 text-gray-600">
            <MdOutlineCalendarToday className="text-gray-400" />
            <span className="text-sm">{date.toLocaleString()}</span>
          </div>

          {/* Team Section */}
          <div className="mt-4">
            <div className="flex -space-x-2 overflow-hidden">
              {task.assignedTo.map((user: UserDto) => (
                <Tooltip key={user._id} label={user.username}>
                  <Avatar
                    src={user.image}
                    radius="xl"
                    size="md"
                    className="border-2 border-white ring-2 ring-gray-50"
                  />
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {formattedCreationDate}
            </span>
            <button
              onClick={open}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiEdit className="text-gray-600" size={16} />
            </button>
          </div>
        </div>
      </div>

      <CreateOrUpdateTaskModal
        modalOpened={modalOpened}
        closeModal={closeModal}
        initialValues={{
          ...task,
          dueDate: date,
          assignedTo: task.assignedTo.map((user: any) => user.username),
        }}
      />
    </div>
  );
};

export default TaskCard;
