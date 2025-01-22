import React from "react";
import BackLogTableHead from "./ProductBacklogTableHead";
import { BackLogTableBodyContainer } from "./ProductBackLogTableRows";
import { BackLogItemDto } from "@/Utils/types";
import ShowSprintsButton from "../ShowSprintsButton";

const BackLogTable = ({
  aiGeneratedBackLogs,
  setAiGeneratedBacklog,
  isSelectingForSprint,
}: {
  aiGeneratedBackLogs?: BackLogItemDto[];
  setAiGeneratedBacklog?: React.Dispatch<
    React.SetStateAction<BackLogItemDto[]>
  >;
  isSelectingForSprint?: boolean;
}) => {
  return (
    <div className="w-full bg-white  rounded-md">
      {!isSelectingForSprint && (
        <div className="flex w-full justify-end pr-4 py-2 gap-2">
          {/* <GroupingControls /> */}
          <ShowSprintsButton/>
        </div>
      )}
      <table className="w-full ">
        <BackLogTableHead
          aiGeneratedBackLogs={aiGeneratedBackLogs ? true : false}
          isSelectingForSprint={isSelectingForSprint ? true : false}
        />
        <BackLogTableBodyContainer
          aiGeneratedBackLogs={aiGeneratedBackLogs}
          setAiGeneratedBacklog={setAiGeneratedBacklog}
          isSelectingForSprint={isSelectingForSprint ? true : false}
        />
      </table>
    </div>
  );
};

export default BackLogTable;
