"use client";
import { Button, TextInput, Text } from "@mantine/core";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";

export const GroupingControls = () => {
  const {
    isGrouping,
    setIsGrouping,
    selectedItems,
    groupName,
    setGroupName,
    createGroup,
    setSelectedItems
  } = useBackLogContext();

  const handleCreateGroup = async () => {
    if (selectedItems.length < 1 || !groupName.trim()) return;
    await createGroup(groupName, selectedItems);
    setIsGrouping(false);
    setSelectedItems([]);
    setGroupName("");
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => {setIsGrouping(!isGrouping); setSelectedItems([]) ;setGroupName("") }}
        color={isGrouping ? "red" : "blue"}
      >
        {isGrouping ? "Cancel Grouping" : "Create Group"}
      </Button>
      
      {isGrouping && (
        <div className="flex items-center gap-4">
          <TextInput
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.currentTarget.value)}
          />
          <Button
            disabled={selectedItems.length < 2 || !groupName.trim()}
            onClick={handleCreateGroup}
          >
            Create Group
          </Button>
          <Text size="sm" color="dimmed">
            {selectedItems.length} items selected
          </Text>
        </div>
      )}
    </div>
  );
}; 