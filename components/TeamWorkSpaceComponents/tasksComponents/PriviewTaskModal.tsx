"use client";
import { TaskDto } from "@/Utils/types";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoPlay } from "react-icons/io5";
import SingleTaskPreview from "./SingleTaskPreview";
import { FaPlay } from "react-icons/fa6";

const PreviewTaskModal = ({ task }: { task: TaskDto }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <SingleTaskPreview task={task} />
      </Modal>

      <button
        className="flex items-center gap-4 px-4 py-2 text-white font-bold"
        onClick={open}
      >
        <FaPlay size={15} color="blue" />
      </button>
    </>
  );
};
export default PreviewTaskModal;
