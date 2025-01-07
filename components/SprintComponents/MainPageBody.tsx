"use client";
import React, { useState } from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import SingleSprintPreview from "./SingleSprintPrieview";
import { IconCalendar, IconCheckbox } from "@tabler/icons-react";
import { Badge, Tooltip } from "@mantine/core";
import { SprintDto } from "@/Utils/types";
import SingleSprintCard from "./SingleSprintCard";

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
        <SingleSprintCard
          key={sprint._id}
          sprint={sprint}
          handleSprintClick={handleSprintClick}
        />
      ))}
    </div>
  );
};

export default MainPageBody;
