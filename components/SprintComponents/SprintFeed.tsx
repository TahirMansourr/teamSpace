"use client";
import React from "react";
import { useSprintContext } from "../Contexts/SprintContext";
import SprintHorizantalScroll from "./SprintHorizantalScroll";
import { SprintDto } from "@/Utils/types";

const SprintFeed = () => {
  const { allSprints, selectedBackLog, sprintsByStatus } = useSprintContext();
  // if (selectedBackLog) {
  //   if (sprintsByStatus) {
  //     const requiredBacklogSprint = sprintsByStatus.find(
  //       (sprint) => sprint._id === selectedBackLog._id
  //     );
  //     if (requiredBacklogSprint?.sprints) {
  //       return <SprintFeed />;
  //     }
  //     return <div className="flex flex-col w-full">Oops! No Sprints Found</div>;
  //   }
  // }
  return (
    <div className="flex flex-col gap-2 w-full">
      {allSprints && allSprints.planned.length > 0 ? (
        <SprintHorizantalScroll sprints={allSprints?.active} status="Active" />
      ) : (
        <div>No Active Sprints</div>
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
      {allSprints && allSprints.planned.length > 0 ? (
        <SprintHorizantalScroll
          sprints={allSprints?.planned}
          status="Planned"
        />
      ) : (
        <div>No Sprints Planned</div>
      )}
    </div>
  );
};

export default SprintFeed;
