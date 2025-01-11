import { SprintDto } from "@/Utils/types";
import { ScrollArea, Text } from "@mantine/core";
import React from "react";
import SingleSprintCard from "./SingleSprintCard";

const SprintHorizantalScroll = ({
  sprints,
  status,
}: {
  sprints: SprintDto[];
  status: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-3 border p-3 rounded-lg hover:shadow-lg">
      <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
        {status} Sprints
      </p>
      <ScrollArea w={"100%"} p={"md"} scrollbars={"x"} scrollHideDelay={1}>
        <div className="flex gap-2 m-2">
          {sprints.map((sprint: SprintDto) => (
            <SingleSprintCard key={sprint._id} sprint={sprint} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SprintHorizantalScroll;
