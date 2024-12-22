import { ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import ProductBacklogTableHead from "./ProductBacklogTableHead";
import { DragAndDropWrapper } from "./DragAndDropWrapper";
import { GroupingControls } from "./GroupingControls";

const ProductBackLogTable = () => {
 
 

  return (
    <ScrollArea className="flex-1 overflow-auto mx-auto bg-white dark:bg-gray-900 rounded-md w-[90%]">
      <GroupingControls />
      <table className="w-full border-collapse">
        <ProductBacklogTableHead isGrouping={false} />
        <DragAndDropWrapper />
      </table>
    </ScrollArea>
  );
};

export default ProductBackLogTable;
