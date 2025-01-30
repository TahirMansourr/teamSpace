"use client";
import React from "react";
import { useSprintContext } from "../Contexts/SprintContext";
import SprintHorizantalScroll from "./SprintHorizantalScroll";
import FullScreenLoading from "@/Utils/FullScreenLoading";

const SprintFeed = () => {
  const { allSprints, loading , sprintsByStatus } = useSprintContext();
  if (loading) {
    return <FullScreenLoading />;
  } else
    return (
      <div className="flex flex-col gap-2 w-full">
        {allSprints && allSprints.active.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.active}
            status="Active"
          />
        ) : (
          null
        )}
        {allSprints && allSprints.planned.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.planned}
            status="Planned"
          />
        ) : (
         null
        )}
        {allSprints && allSprints.cancelled.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.cancelled}
            status="Cancelled"
          />
        ) : (
          null
        )}
        {allSprints && allSprints.completed.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.completed}
            status="Completed"
          />
        ) : (
          null
        )}
      </div>
    );
};

export default SprintFeed;
