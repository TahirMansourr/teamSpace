"use client";
import React from "react";
import SingleSprintPreview from "./SingleSprintPrieview";
import SprintFeed from "./SprintFeed";
import { useSprintContext } from "../Contexts/SprintContext";
import FullScreenLoading from "@/Utils/FullScreenLoading";

const MainPageBody = () => {
  const { isTransitioning, selectedSprint, loading } = useSprintContext();

  if (loading) {
    return <FullScreenLoading />;
  } else if (!loading && selectedSprint) {
    return (
      <div
        className={`transition-all duration-300 ${
          !isTransitioning
            ? "opacity-0 translate-y-10"
            : "opacity-100 translate-y-0 animate-slide-in "
        }`}
      >
        <SingleSprintPreview sprint={selectedSprint} />
      </div>
    );
  } else
    return (
      <div
        className={` flex flex-col w-full transition-all duration-300 p-5 ${
          isTransitioning
            ? "opacity-0 -translate-y-10"
            : "opacity-100 translate-y-0 animate-fade-in"
        }`}
      >
        <SprintFeed />
      </div>
    );
};

export default MainPageBody;
