"use client";
import { ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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

  const [groups, setGroups] = useState<{
    [key: string]: { name: string; items: string[] };
  }>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || !backLog?.backlogItems) return;

    // Find which groups the items belong to (if any)
    const sourceGroupId = Object.entries(groups).find(([_, group]) =>
      group.items.includes(active.id as string)
    )?.[0];

    const targetGroupId = Object.entries(groups).find(([_, group]) =>
      group.items.includes(over.id as string)
    )?.[0];

    // If either item is in a group, handle group-related movement
    if (sourceGroupId || targetGroupId) {
      setGroups(prevGroups => {
        const newGroups = { ...prevGroups };

        // Remove item from source group
        if (sourceGroupId) {
          newGroups[sourceGroupId] = {
            ...newGroups[sourceGroupId],
            items: newGroups[sourceGroupId].items.filter(id => id !== active.id)
          };
        }

        // Add item to target group
        if (targetGroupId) {
          const overItemIndex = newGroups[targetGroupId].items.indexOf(over.id as string);
          newGroups[targetGroupId] = {
            ...newGroups[targetGroupId],
            items: [
              ...newGroups[targetGroupId].items.slice(0, overItemIndex + 1),
              active.id as string,
              ...newGroups[targetGroupId].items.slice(overItemIndex + 1)
            ]
          };
        }

        // Clean up empty groups
        Object.entries(newGroups).forEach(([groupId, group]) => {
          if (group.items.length === 0) {
            delete newGroups[groupId];
          }
        });

        return newGroups;
      });

      // Don't proceed with regular reordering if we handled group movement
      return;
    }

    // Handle regular reordering (outside of groups)
    if (active.id !== over.id) {
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
    <ScrollArea className="flex-1 overflow-auto mx-auto bg-white dark:bg-gray-900 rounded-md w-[90%]">
      <table className="w-full border-collapse">
        <ProductBacklogTableHead isGrouping={false} />
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
              <BackLogItemTableBody 
                backLog={backLog} 
                loading={loading}
                groups={groups}
                setGroups={setGroups}
              />
            </SortableContext>
          </DndContext>
        )}
      </table>
    </ScrollArea>
  );
};

export default ProductBackLogTable;
