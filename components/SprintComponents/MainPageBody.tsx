"use client";
import React from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import SingleSprintPreview from "./SingleSprintPrieview";
import SprintFeed from "./SprintFeed";
import { useSprintContext } from "../Contexts/SprintContext";

const MainPageBody = () => {
  // const { selectedBackLog } = useBackLogContext();
  // console.log(
  //   "🚀 ~ file: MainPageBody.tsx:11 ~ selectedBackLog:",
  //   selectedBackLog?.sprints
  // );

  const {
    isTransitioning,
    handleBack,
    selectedSprint,
    selectedBackLog,
    sprintsByStatus,
  } = useSprintContext();

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
      className={` flex flex-col w-full transition-all duration-300 ${
        isTransitioning
          ? "opacity-0 -translate-y-10"
          : "opacity-100 translate-y-0"
      }`}
    >
      <SprintFeed />
    </div>
  );
};

export default MainPageBody;
