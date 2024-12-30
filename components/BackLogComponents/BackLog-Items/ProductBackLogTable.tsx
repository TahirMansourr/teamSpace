import { ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import ProductBacklogTableHead from "./ProductBacklogTableHead";
import { ProductBackLogTableRows } from "./ProductBackLogTableRows";
import { GroupingControls } from "./GroupingControls";
import { BackLogItemDto } from "@/Utils/types";

    const ProductBackLogTable = ({aiGeneratedBackLogs , setAiGeneratedBacklog} : {aiGeneratedBackLogs? : BackLogItemDto[] , setAiGeneratedBacklog? : React.Dispatch<React.SetStateAction<BackLogItemDto[]>>}) => {
    return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-md">
      <div className="flex w-full justify-end pr-4 py-2">
        <GroupingControls />
      </div>
      <table className="w-full ">
        <ProductBacklogTableHead aiGeneratedBackLogs={aiGeneratedBackLogs ? true : false}/>
        <ProductBackLogTableRows aiGeneratedBackLogs={aiGeneratedBackLogs} setAiGeneratedBacklog={setAiGeneratedBacklog}/>
      </table>
    </div>
  );
};

export default ProductBackLogTable;
