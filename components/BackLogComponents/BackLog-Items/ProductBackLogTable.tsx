import React from "react";
import ProductBacklogTableHead from "./ProductBacklogTableHead";
import { ProductBackLogTableRows } from "./ProductBackLogTableRows";
import { GroupingControls } from "./GroupingControls";
import { BackLogItemDto } from "@/Utils/types";

const ProductBackLogTable = ({
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
        <div className="flex w-full justify-end pr-4 py-2">
          <GroupingControls />
        </div>
      )}
      <table className="w-full ">
        <ProductBacklogTableHead
          aiGeneratedBackLogs={aiGeneratedBackLogs ? true : false}
          isSelectingForSprint={isSelectingForSprint ? true : false}
        />
        <ProductBackLogTableRows
          aiGeneratedBackLogs={aiGeneratedBackLogs}
          setAiGeneratedBacklog={setAiGeneratedBacklog}
          isSelectingForSprint={isSelectingForSprint ? true : false}
        />
      </table>
    </div>
  );
};

export default ProductBackLogTable;
