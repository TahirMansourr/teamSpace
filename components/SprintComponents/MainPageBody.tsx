"use client";
import React, { useState } from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import SingleSprintPreview from "./SingleSprintPrieview";
import { IconCalendar, IconCheckbox } from "@tabler/icons-react";
import { Badge, Tooltip } from "@mantine/core";
import { SprintDto } from "@/Utils/types";

const MainPageBody = () => {
  const { selectedBackLog } = useBackLogContext();
  console.log(
    "🚀 ~ file: MainPageBody.tsx:11 ~ selectedBackLog:",
    selectedBackLog?.sprints
  );

  const [selectedSprint, setSelectedSprint] = useState<SprintDto | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSprintClick = (sprint: SprintDto) => {
    setIsTransitioning(true);
    setSelectedSprint(sprint);
    setTimeout(() => {
      setSelectedSprint(sprint);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSprint(null);
      setIsTransitioning(false);
    }, 300);
  };

  if (selectedSprint) {
    return (
      <div
        className={`transition-all duration-300 ${
          !isTransitioning
            ? "opacity-0 translate-y-10"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-300"
        >
          ← Back to All Sprints
        </button>
        <SingleSprintPreview sprint={selectedSprint} />
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
        isTransitioning
          ? "opacity-0 -translate-y-10"
          : "opacity-100 translate-y-0"
      }`}
    >
      {selectedBackLog?.sprints?.map((sprint: SprintDto) => (
        <div
          key={sprint._id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg text-indigo-600">
              {sprint.name}
            </h3>
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
      ))}
    </div>
  );
};

export default MainPageBody;
