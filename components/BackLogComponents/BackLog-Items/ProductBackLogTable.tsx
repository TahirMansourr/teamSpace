"use client";
import { ScrollArea } from "@mantine/core";
import React from "react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import ProductBacklogTableHead from "./ProductBacklogTableHead";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import BackLogItemTableBody from "./BackLogItemTableBody";

const ProductBackLogTable = () => {
  const {
    selectedBackLog: backLog,
    rearrangeBacklogItems,
    loading,
  } = useBackLogContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id && backLog?.backlogItems) {
      const oldIndex = backLog.backlogItems.findIndex(
        (project) => project._id === active.id
      );
      const newIndex = backLog.backlogItems.findIndex(
        (project) => project._id === over.id
      );

      const newProjects = [...backLog.backlogItems];
      const [movedProject] = newProjects.splice(oldIndex, 1);
      newProjects.splice(newIndex, 0, movedProject);
      rearrangeBacklogItems(newProjects);
    }
  };
  return (
    <ScrollArea className="flex-1 overflow-auto mx-auto  bg-white dark:bg-gray-900 rounded-md w-[90%]">
      <table className="w-full border-collapse">
        <ProductBacklogTableHead />
        {backLog?.backlogItems && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={backLog?.backlogItems.map((p) => p._id)}
              strategy={rectSortingStrategy}
            >
              <BackLogItemTableBody backLog={backLog} loading={loading} />
            </SortableContext>
          </DndContext>
        )}
      </table>
    </ScrollArea>
  );
};

export default ProductBackLogTable;
