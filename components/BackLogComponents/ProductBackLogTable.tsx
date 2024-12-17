"use client";
import { Button, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { BackLogItemDto } from "@/Utils/types";
import { FaPlus } from "react-icons/fa6";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { useDisclosure } from "@mantine/hooks";
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
  useSortable,
} from "@dnd-kit/sortable";
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
        <thead className="bg-gray-50 mb-2">
          <tr>
            <th className="p-0 m-0"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acceptance Criteria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignee(s)
            </th>
          </tr>
        </thead>
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
