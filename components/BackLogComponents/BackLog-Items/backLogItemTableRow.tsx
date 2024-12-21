"use client";
import { BackLogItemDto } from "@/Utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { MdDragIndicator } from "react-icons/md";
import PreviewBackLogItem from "./PrieviewBackLogItem";
import { useDisclosure } from "@mantine/hooks";
import { FaPlay } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import CreateBackLogItemModal from "./createBackLogItemModal";

const BackLogItemTableRow = ({
  item,
  index,
  id,
}: {
  item: BackLogItemDto;
  index: number;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [opened, { open, close }] = useDisclosure();
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer"
      key={item._id}
      ref={setNodeRef}
      style={style}
    >
      <td className="w-8">
        <button
          {...attributes}                     
          {...listeners}
          className="hover:bg-gray-50 rounded-lg transition-colors cursor-grab z-10 p-2"
        >
          <MdDragIndicator className="text-gray-400 hover:text-gray-600" />
        </button>
      </td>
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <PreviewBackLogItem backlogItem={item}
        opened={opened}
        close={close} />
        <div className="flex gap-2">
          <FaPlay onClick={open} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
          <FaEdit onClick={openEdit} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
        </div>
        <CreateBackLogItemModal opened={editOpened} close={closeEdit} initialValues={item} />
      </td>
    </tr>
  );
};

export default BackLogItemTableRow;
