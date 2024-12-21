"use client";
import { BackLogDto, BackLogItemDto } from "@/Utils/types";
import React, { useState } from "react";
import { Button, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import BackLogItemTableRow from "./backLogItemTableRow";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";

interface BackLogItemTableBodyProps {
  backLog: BackLogDto;
  loading: boolean;
  groups: { [key: string]: { name: string; items: string[] } };
  setGroups: (groups: { [key: string]: { name: string; items: string[] } }) => void;
}

const BackLogItemTableBody = ({
  backLog,
  loading,
  groups,
  setGroups,
}: BackLogItemTableBodyProps) => {
  const { updateGroups, createGroup } = useBackLogContext();
  const [opened, { open, close }] = useDisclosure();
  const [isGrouping, setIsGrouping] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async () => {
    if (selectedItems.length < 2 || !groupName.trim()) return;

    await createGroup(groupName, selectedItems);
    
    const groupId = `group-${Date.now()}`;
    const newGroups = {
      ...groups,
      [groupId]: {
        name: groupName,
        items: selectedItems
      }
    };

    setGroups(newGroups);
    setSelectedItems([]);
    setGroupName("");
    setIsGrouping(false);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200 block md:table-row-group">
      <LoadingOverlay visible={loading} />
      
      {/* Grouping Controls */}
      <tr className="block md:table-row">
        <td colSpan={10} className="p-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsGrouping(!isGrouping)}
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
        </td>
      </tr>

      {/* Grouped Items */}
      {Object.entries(groups).map(([groupId, group]) => (
        <React.Fragment key={groupId}>
          <tr className="bg-gray-100">
            <td colSpan={10} className="px-6 py-2 font-medium">
              {group.name}
            </td>
          </tr>
          {backLog?.backlogItems
            ?.filter(item => group.items.includes(item._id))
            .map((item: BackLogItemDto, index) => (
              <BackLogItemTableRow
                key={item._id}
                item={item}
                index={index}
                id={item._id}
                isGrouped={true}
                isSelectable={isGrouping}
                isSelected={selectedItems.includes(item._id)}
                onSelect={() => toggleItemSelection(item._id)}
              />
            ))}
        </React.Fragment>
      ))}

      {/* Ungrouped Items */}
      {backLog?.backlogItems
        ?.filter(item => !Object.values(groups)
          .some(group => group.items.includes(item._id)))
        .map((item: BackLogItemDto, index) => (
          <BackLogItemTableRow
            key={item._id}
            item={item}
            index={index}
            id={item._id}
            isSelectable={isGrouping}
            isSelected={selectedItems.includes(item._id)}
            onSelect={() => toggleItemSelection(item._id)}
          />
        ))}

      {/* Add Item Button */}
      <tr className="block md:table-row">
        <CreateBackLogItemModal opened={opened} close={close} />
        <td className="block w-full md:table-cell md:w-auto">
          <Button
            className="w-full md:w-auto m-4 transition-all duration-150 hover:scale-105"
            onClick={open}
          >
            <div className="flex items-center justify-center gap-3">
              <FaPlus /> <Text ml={2}>Add Item</Text>
            </div>
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default BackLogItemTableBody;
