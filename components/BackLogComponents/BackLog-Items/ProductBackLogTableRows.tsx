import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import BackLogTableBody from "./BackLogItemTableBody";
import { BackLogItemDto } from "@/Utils/types";
import { useSprintContext } from "@/components/Contexts/SprintContext";

export const BackLogTableBodyContainer = ({
  aiGeneratedBackLogs,
  setAiGeneratedBacklog,
  isSelectingForSprint,
  existingSprint
}: {
  aiGeneratedBackLogs?: BackLogItemDto[];
  setAiGeneratedBacklog?: React.Dispatch<
    React.SetStateAction<BackLogItemDto[]>
  >;
  isSelectingForSprint: boolean;
  existingSprint?: boolean;
}) => {
  const {
    selectedBackLog: backLog,
    filteredBacklogs,
    rearrangeBacklogItems,
    loading,
    groups,
    setGroups,
    setFilteredBacklogs,
  } = useBackLogContext();
  const {selectedBackLogWhenCreatingASprint} = useSprintContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || !backLog?.backlogItems) return;

    if (active.id !== over.id) {
      setFilteredBacklogs((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // Find which groups the items belong to (if any)
    const sourceGroupId = Object.entries(groups).find(([_, group]) =>
      group.items.includes(active.id as string)
    )?.[0];

    const targetGroupId = Object.entries(groups).find(([_, group]) =>
      group.items.includes(over.id as string)
    )?.[0];

    // If either item is in a group, handle group-related movement
    if (sourceGroupId || targetGroupId) {
      setGroups((prevGroups) => {
        const newGroups = { ...prevGroups };

        // Remove item from source group
        if (sourceGroupId) {
          newGroups[sourceGroupId] = {
            ...newGroups[sourceGroupId],
            items: newGroups[sourceGroupId].items.filter(
              (id) => id !== active.id
            ),
          };
        }

        // Add item to target group
        if (targetGroupId) {
          const overItemIndex = newGroups[targetGroupId].items.indexOf(
            over.id as string
          );
          newGroups[targetGroupId] = {
            ...newGroups[targetGroupId],
            items: [
              ...newGroups[targetGroupId].items.slice(0, overItemIndex + 1),
              active.id as string,
              ...newGroups[targetGroupId].items.slice(overItemIndex + 1),
            ],
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
    backLog?.backlogItems && (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredBacklogs.map((p) => p._id)}
          strategy={rectSortingStrategy}
        >
          <BackLogTableBody
            backLog={isSelectingForSprint && !existingSprint ? selectedBackLogWhenCreatingASprint! : backLog}
            loading={loading}
            groups={groups}
            setGroups={setGroups}
            aiGeneratedBackLogs={aiGeneratedBackLogs}
            setAiGeneratedBacklog={setAiGeneratedBacklog}
            isSelectingForSprint={isSelectingForSprint}
          />
        </SortableContext>
      </DndContext>
    )
  );
};
