"use client";
import { IssueDto } from "@/Utils/types";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaPlay } from "react-icons/fa6";
import SingleIssuePreview from "./SingleIssuePreview";

const PreviewIssueModal = ({ issue }: { issue: IssueDto }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <SingleIssuePreview issue={issue} />
      </Modal>

      <button
        className="flex items-center gap-4 px-4 py-2 text-white font-bold"
        onClick={open}
      >
        <FaPlay size={15} color="red" />
      </button>
    </>
  );
};

export default PreviewIssueModal;
