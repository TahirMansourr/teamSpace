"use client";
import { BackLogItemDto } from "@/Utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { MdDragIndicator } from "react-icons/md";
import PreviewBackLogItem from "./PrieviewBackLogItem";
import { useDisclosure } from "@mantine/hooks";
import { FaCheck, FaPlay, FaX } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import { LoadingOverlay } from "@mantine/core";

interface BackLogItemTableRowProps {
  item: BackLogItemDto;
  index: number;
  id: string;
  isGrouped?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  isGenerated?: boolean;
  isAccepted?: boolean;
  setAiGeneratedBacklog?: React.Dispatch<
    React.SetStateAction<BackLogItemDto[]>
  >;
  isSelectingForSprint?: boolean;
}

const BackLogItemTableRow = ({
  item,
  index,
  id,
  isGrouped = false,
  isSelectable = false,
  isSelected = false,
  onSelect,
  isGenerated,
  isAccepted,
  setAiGeneratedBacklog,
  isSelectingForSprint,
}: BackLogItemTableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [opened, { open, close }] = useDisclosure();
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure();
  const {
    selectedBackLog,
    handleCreateBackLogItem,
    loading,
    setAcceptedBacklogs,
  } = useBackLogContext();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <tr
      className={`
        hover:bg-gray-50 cursor-pointer w-[90%]
        ${isGrouped ? "pl-8 border-l-4 border-blue-200" : "mt-10"}
        ${isSelected ? "bg-blue-50" : ""}
        ${isAccepted ? "bg-green-50" : ""}
      `}
      key={item._id}
      ref={setNodeRef}
      style={style}
    >
      <LoadingOverlay visible={loading} />
      {isSelectable || isSelectingForSprint ? (
        <td className="w-8">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4"
          />
        </td>
      ) : null}
      {!isGenerated && !isSelectingForSprint ? (
        <td className="w-8">
          <button
            {...attributes}
            {...listeners}
            className="hover:bg-gray-50 rounded-lg transition-colors cursor-grab z-10 p-2"
          >
            <MdDragIndicator className="text-gray-400 hover:text-gray-600" />
          </button>
        </td>
      ) : null}
      {!isSelectingForSprint && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1}
        </td>
      )}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {item.title.length > 15 ? `${item.title.slice(0, 20)} ...` : item.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {item.description.length > 20
          ? `${item.description.slice(0, 20)} ...`
          : item.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {item.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          {item.priority}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.acceptanceCriteria.length > 20
          ? `${item.acceptanceCriteria.slice(0, 20)} ...`
          : item.acceptanceCriteria}
      </td>
      {!isGenerated ? (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.assignee.map((assignee) => (
            <span
              key={assignee._id}
              className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
            >
              {assignee.username}
            </span>
          ))}
        </td>
      ) : null}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <PreviewBackLogItem backlogItem={item} opened={opened} close={close} />
        <div className="flex gap-2">
          <FaPlay
            onClick={open}
            className="text-gray-500 hover:text-gray-600 cursor-pointer"
          />
          {!isSelectingForSprint && (
            <FaEdit
              onClick={openEdit}
              className="text-gray-500 hover:text-gray-600 cursor-pointer"
            />
          )}
        </div>
        <CreateBackLogItemModal
          opened={editOpened}
          close={closeEdit}
          initialValues={item}
        />
      </td>
      <td>
        {selectedBackLog && isGenerated && !isAccepted && (
          <div className="flex gap-4 items-center pl-3">
            <div className="group relative">
              <FaCheck
                color="green"
                onClick={async () => {
                  await handleCreateBackLogItem({ ...item, assignee: [] });
                  setAiGeneratedBacklog &&
                    setAiGeneratedBacklog(
                      (prev) =>
                        prev.filter(
                          (p) => p.title !== item.title
                        ) as BackLogItemDto[]
                    );
                  setAcceptedBacklogs((prev) => [...prev, item]);
                }}
                className="text-gray-500 hover:text-gray-600 cursor-pointer"
              />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Accept
              </span>
            </div>
            <div className="group relative">
              <FaX
                color="red"
                onClick={() => {
                  setAiGeneratedBacklog &&
                    setAiGeneratedBacklog(
                      (prev) =>
                        prev.filter(
                          (p) => p.title !== item.title
                        ) as BackLogItemDto[]
                    );
                }}
                className="text-gray-500 hover:text-gray-600 cursor-pointer"
              />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Reject
              </span>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BackLogItemTableRow;
