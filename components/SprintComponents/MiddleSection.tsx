import { ScrollArea } from "@mantine/core";
import BackLogItemInsideSprintcard from "./BackLogItemInsideSprintcard";
import { BackLogItemDto, SprintDto } from "@/Utils/types";
import { Dispatch, SetStateAction } from "react";

const MiddleSection = ({
  sprint,
  setSelectedBacklogItemForSingleSprint,
}: {
  sprint: SprintDto;
  setSelectedBacklogItemForSingleSprint: Dispatch<
    SetStateAction<BackLogItemDto | null>
  >;
}) => {
  return (
    <ScrollArea className="w-1/2 h-[calc(100vh-6rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm m-1 hover:shadow-md p-6">
      <div className="grid grid-cols-2 gap-4 m-2">
        {sprint.backlogItems?.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedBacklogItemForSingleSprint(item)}
          >
            <BackLogItemInsideSprintcard backLogItem={item} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
export default MiddleSection;
