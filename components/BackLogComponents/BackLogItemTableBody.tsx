"use client";
import { BackLogDto, BackLogItemDto } from "@/Utils/types";
import React from "react";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { Button, LoadingOverlay, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { useSortable } from "@dnd-kit/sortable";
import BackLogItemTableRow from "./backLogItemTableRow";

const BackLogItemTableBody = ({
  backLog,
  loading,
}: {
  backLog: BackLogDto;
  loading: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <LoadingOverlay visible={loading} />
      {backLog?.backlogItems?.map((item: BackLogItemDto, index) => (
        <BackLogItemTableRow
          key={item._id}
          item={item}
          index={index}
          id={item._id}
        />
      ))}
      <tr>
        <CreateBackLogItemModal opened={opened} close={close} />
        <Button
          className=" m-4 transition-all duration-150 hover:scale-105"
          onClick={open}
        >
          <div className="flex items-center justify-center gap-3">
            <FaPlus /> <Text ml={2}>Add Item</Text>
          </div>
        </Button>
      </tr>
    </tbody>
  );
};

export default BackLogItemTableBody;