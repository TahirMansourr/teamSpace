"use client";
import React from "react";
import { useSprintContext } from "../Contexts/SprintContext";
import SprintHorizantalScroll from "./SprintHorizantalScroll";
import FullScreenLoading from "@/Utils/FullScreenLoading";

const SprintFeed = () => {
  const { allSprints, loading } = useSprintContext();
  if (loading) {
    return <FullScreenLoading />;
  } else
    return (
      <div className="flex flex-col gap-2 w-full">
        {allSprints && allSprints.planned.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.active}
            status="Active"
          />
        ) : (
          <div>No Active Sprints</div>
        )}
        {allSprints && allSprints.planned.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.planned}
            status="Planned"
          />
        ) : (
          <div>No Sprints Planned</div>
        )}
        {allSprints && allSprints.cancelled.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.cancelled}
            status="Cancelled"
          />
        ) : (
          <div>No Cancelled Sprints</div>
        )}
        {allSprints && allSprints.completed.length > 0 ? (
          <SprintHorizantalScroll
            sprints={allSprints?.completed}
            status="Completed"
          />
        ) : (
          <div>No Sprints Completed Yet</div>
        )}
      </div>
    );
};

export default SprintFeed;
