"use client";
import { BackLogItemDto } from "@/Utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { MdDragIndicator } from "react-icons/md";
import PreviewBackLogItem from "./PrieviewBackLogItem";
import { useDisclosure } from "@mantine/hooks";
import { FaCheck, FaPlay, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { CreateProductBackLogItem } from "@/lib/actions/ProductBackLogItemActions";
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
}

const BackLogItemTableRow = ({
  item,
  index,
  id,
  isGrouped = false,
  isSelectable = false,
  isSelected = false,
  onSelect,
  isGenerated 
}: BackLogItemTableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [opened, { open, close }] = useDisclosure();
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure();
  const {selectedBackLog , handleCreateBackLogItem , loading} = useBackLogContext() 

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <tr
      className={`
        hover:bg-gray-50 cursor-pointer
        ${isGrouped ? 'pl-8 border-l-2 border-blue-200' : 'mt-2'}
        ${isSelected ? 'bg-blue-50' : ''}
      `}
      key={item._id}
      ref={setNodeRef}
      style={style}
    >
      <LoadingOverlay visible={loading} />
      {isSelectable && (
        <td className="w-8">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4"
          />
        </td>
      )}
      {!isGenerated ?<td className="w-8">
        <button
          {...attributes}                     
          {...listeners}
          className="hover:bg-gray-50 rounded-lg transition-colors cursor-grab z-10 p-2"
        >
          <MdDragIndicator className="text-gray-400 hover:text-gray-600" />
        </button>
      </td> : null}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {item.title.length > 15
          ? `${item.title.slice(0, 20)} ...`
          : item.title}
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
      {!isGenerated ?<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.assignee.map((assignee) => (
          <span
            key={assignee._id}
            className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {assignee.username}
          </span>
        ))}
      </td> : null}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <PreviewBackLogItem backlogItem={item}
        opened={opened}
        close={close} />
        <div className="flex gap-2">
          <FaPlay onClick={open} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
          <FaEdit onClick={openEdit} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
          {selectedBackLog && isGenerated &&
            <>
            <FaCheck onClick={ async()=>{ await handleCreateBackLogItem({...item , assignee : [] })}} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
            <FaTrash onClick={openEdit} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
            </>
            }
        </div>
        <CreateBackLogItemModal opened={editOpened} close={closeEdit} initialValues={item} />
      </td>
    </tr>
  );
};

export default BackLogItemTableRow;
