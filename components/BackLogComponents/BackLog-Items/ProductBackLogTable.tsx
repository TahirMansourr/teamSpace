import { ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import ProductBacklogTableHead from "./ProductBacklogTableHead";
import { ProductBackLogTableRows } from "./ProductBackLogTableRows";
import { GroupingControls } from "./GroupingControls";
import { BackLogItemDto } from "@/Utils/types";

const ProductBackLogTable = ({aiGeneratedBackLogs} : {aiGeneratedBackLogs? : BackLogItemDto[]}) => {
 
  return (
    <ScrollArea className="  mx-auto bg-white dark:bg-gray-900 rounded-md w-[95%] overflow-hidden">
      <div className="flex w-full justify-end mb-2">
        <GroupingControls />
      </div>
      <table className="w-full border-collapse overflow-hidden">
        <ProductBacklogTableHead />
        <ProductBackLogTableRows aiGeneratedBackLogs={aiGeneratedBackLogs}/>
      </table>
    </ScrollArea>
  );
};

export default ProductBackLogTable;
