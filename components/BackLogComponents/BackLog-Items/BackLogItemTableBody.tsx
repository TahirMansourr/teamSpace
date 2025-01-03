"use client";
import { BackLogDto, BackLogItemDto } from "@/Utils/types";
import React, { useState } from "react";
import { Button, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import BackLogItemTableRow from "./backLogItemTableRow";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import { GroupActions } from "./GroupActions";

interface BackLogItemTableBodyProps {
  backLog: BackLogDto;
  loading: boolean;
  groups: { [key: string]: { name: string; items: string[] } };
  setGroups: (groups: {
    [key: string]: { name: string; items: string[] };
  }) => void;
  aiGeneratedBackLogs?: BackLogItemDto[];
  setAiGeneratedBacklog?: React.Dispatch<
    React.SetStateAction<BackLogItemDto[]>
  >;
}

const BackLogItemTableBody = ({
  backLog,
  loading,
  groups,
  aiGeneratedBackLogs,
  setAiGeneratedBacklog,
}: BackLogItemTableBodyProps) => {
  const {
    isGrouping,
    selectedItems,
    setSelectedItems,
    acceptedBacklogs,
    filteredBacklogs,
  } = useBackLogContext();
  const [opened, { open, close }] = useDisclosure();

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev: string[]) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
    //if the item is in the group remove it from the group else add it to the group
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200 block md:table-row-group">
      <LoadingOverlay visible={loading} />
      {/* Grouped Items */}
      {Object.entries(groups).map(([groupId, group]) => (
        <React.Fragment key={groupId}>
          {!aiGeneratedBackLogs && filteredBacklogs && (
            <tr className=" flex items-center">
              <td colSpan={3}>
                {" "}
                <Text __size="md" p={4} fw={500} aria-colspan={2}>
                  {group.name}
                </Text>
              </td>
              <td className="flex p-4">
                <GroupActions
                  backlogId={backLog._id}
                  groupId={groupId}
                  groupName={group.name}
                />
              </td>
            </tr>
          )}
          {!aiGeneratedBackLogs &&
            filteredBacklogs
              ?.filter((item) => group.items.includes(item._id))
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
          <tr>
            {" "}
            <td colSpan={3}>
              <div className="h-5 w-full"></div>
            </td>
          </tr>

          {/* {aiGeneratedBackLogs
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
                isGenerated={true}
              />
            ))} */}
        </React.Fragment>
      ))}

      {/* Ungrouped Items */}
      {aiGeneratedBackLogs
        ?.filter((item) => !item.groupId)
        .map((item: BackLogItemDto, index) => (
          <BackLogItemTableRow
            key={item._id}
            item={item}
            index={index}
            id={item._id}
            isSelectable={isGrouping}
            isSelected={selectedItems.includes(item._id)}
            onSelect={() => toggleItemSelection(item._id)}
            isGenerated={true}
            setAiGeneratedBacklog={setAiGeneratedBacklog}
          />
        ))}
      {!aiGeneratedBackLogs &&
        filteredBacklogs
          ?.filter((item) => !item.groupId)
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
      {acceptedBacklogs.length > 0 && (
        <>
          <tr>
            <td colSpan={5}>
              <Text size="md" p={4} fw={500}>
                Accepted Backlogs
              </Text>
            </td>
          </tr>
          {acceptedBacklogs.map((item: BackLogItemDto, index) => (
            <BackLogItemTableRow
              key={item._id}
              item={item}
              index={index}
              id={item._id}
              isSelectable={isGrouping}
              isSelected={selectedItems.includes(item._id)}
              onSelect={() => toggleItemSelection(item._id)}
              isGenerated={true}
              isAccepted={true}
            />
          ))}
        </>
      )}

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
