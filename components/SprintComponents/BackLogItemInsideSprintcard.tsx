"use client";
import { BackLogItemDto } from "@/Utils/types";
import { Badge, Avatar, Tooltip, Button } from "@mantine/core";
import {
  IconCheck,
  IconClock,
  IconX,
  IconBug,
  IconStar,
  IconRocket,
  IconTools,
  IconLighter,
  IconUser,
} from "@tabler/icons-react";
import CreateOrUpdateTaskModal from "../TeamWorkSpaceComponents/tasksComponents/CreateTaskModal";
import { useDisclosure } from "@mantine/hooks";
import PreviewBackLogItem from "../BackLogComponents/BackLog-Items/PrieviewBackLogItem";
import { VscPreview } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import CreateBackLogItemModal from "../BackLogComponents/BackLog-Items/createBackLogItemModal";
import { FaEdit } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import React, { useState } from "react";
import CreateOrUpdateIssuesModal from "../TeamWorkSpaceComponents/IssuesComponents/CreateOrUpdateIssueModal";
import CreateOrUpdateNotesModal from "../TeamWorkSpaceComponents/NotesComponents/CreateOrUpdateNotesModal";

const BackLogItemInsideSprintcard = ({
  backLogItem,
}: {
  backLogItem: BackLogItemDto;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const [IssuesOpened, { open: openIssues, close: closeIssues }] =
    useDisclosure();
  const [NotesOpened, { open: openNOtes, close: CloseNotes }] = useDisclosure();
  const [
    previewModalOpened,
    { open: openPreviewModal, close: closePreviewModal },
  ] = useDisclosure();
  const [
    updateModalOpened,
    { open: openUpdateModal, close: closeUpdateModal },
  ] = useDisclosure();
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Done":
        return (
          <Badge color="green" leftSection={<IconCheck size={14} />}>
            Done
          </Badge>
        );
      case "In Progress":
        return (
          <Badge color="blue" leftSection={<IconClock size={14} />}>
            In Progress
          </Badge>
        );
      case "To Do":
        return (
          <Badge color="gray" leftSection={<IconX size={14} />}>
            To Do
          </Badge>
        );
      case "Review":
        return (
          <Badge color="yellow" leftSection={<IconStar size={14} />}>
            Review
          </Badge>
        );
      default:
        return <Badge color="gray">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Feature":
        return <IconRocket size={20} className="text-indigo-500" />;
      case "Bug":
        return <IconBug size={20} className="text-red-500" />;
      case "Technical Debt":
        return <IconTools size={20} className="text-gray-500" />;
      case "Improvement":
        return <IconLighter size={20} className="text-green-500" />;
      case "Spike":
        return <IconStar size={20} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="relative bg-white rounded-lg border p-4 mb-4 transition-transform transform hover:shadow-md hover:cursor-pointer">
      <div className="absolute -top-2 -right-2">
        {getStatusBadge(backLogItem.status)}
      </div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {truncateText(backLogItem.title, 20)}
        </h3>
      </div>
      <p className="text-gray-600 mb-2">
        - {truncateText(backLogItem.description, 60)}
      </p>
      <div className="text-sm text-gray-500 mb-2">
        <strong>Acceptance Criteria:</strong>{" "}
        {truncateText(backLogItem.acceptanceCriteria, 50)}
      </div>
      <div className="flex items-center justify-around gap-2 mb-2">
        <Tooltip label="Feature Type">
          <div className="flex items-center gap-2">
            {getTypeIcon(backLogItem.type)}
            <span className="text-sm text-gray-500">{backLogItem.type}</span>
          </div>
        </Tooltip>
        <Tooltip label="Estimated Effort">
          <div className="flex items-center gap-2">
            <IconClock size={20} className="text-gray-500" />
            <span>{backLogItem.estimatedEffort}h</span>
          </div>
        </Tooltip>
        <Tooltip label="Priority">
          <div className="flex items-center gap-2">
            <IconStar size={20} className="text-yellow-500" />
            <span>{backLogItem.priority}</span>
          </div>
        </Tooltip>
      </div>

      <div className="flex items-center justify-between rounded-lg p-2">
        <div className="flex gap-2 items-center">
          <AiOutlineTeam size={35} color="blue" className="text-gray-500" />
          <div className="flex -space-x-2 mt-2">
            {backLogItem.assignee.map((user) => (
              <Tooltip key={user._id} label={user.username}>
                <Avatar
                  src={user.image}
                  alt={user.username}
                  size={"md"}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300"
            >
              <IconTools
                size={25}
                className="text-blue-600 transform transition-transform duration-300"
                style={{
                  transform: isActionsOpen ? "rotate(45deg)" : "rotate(0)",
                }}
              />
            </button>

            <div
              className={`absolute right-12 -top-0 flex gap-2 transition-all duration-300 origin-right ${
                isActionsOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8 pointer-events-none"
              }`}
            >
              <Tooltip label="Add Task">
                <button
                  onClick={open}
                  className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 hover:scale-110"
                >
                  <IconCheck size={20} className="text-emerald-600" />
                </button>
              </Tooltip>

              <Tooltip label="Add Issue">
                <button
                  onClick={openIssues}
                  className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 transition-all duration-200 hover:scale-110"
                >
                  <IconBug size={20} className="text-rose-600" />
                </button>
              </Tooltip>

              <Tooltip label="Add Note">
                <button
                  onClick={openNOtes}
                  className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 transition-all duration-200 hover:scale-110"
                >
                  <IconStar size={20} className="text-amber-600" />
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="flex gap-2">
            <Tooltip label="Preview Backlog Item">
              <VscPreview
                size={25}
                onClick={openPreviewModal}
                color="blue"
                className="hover:shadow-md hover:scale-105 hover:cursor-pointer"
              />
            </Tooltip>
            <Tooltip label="Edit Backlog Item">
              <FaEdit
                size={25}
                onClick={openUpdateModal}
                color="blue"
                className="hover:shadow-md hover:scale-105 hover:cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <CreateOrUpdateTaskModal
        modalOpened={opened}
        closeModal={close}
        backlogItemId={backLogItem._id}
        backlogtitle={backLogItem.title}
      />
      <CreateOrUpdateIssuesModal
        modalOpened={IssuesOpened}
        closeModal={closeIssues}
        backlogItemId={backLogItem._id}
        backlogtitle={backLogItem.title}
      />
      <CreateOrUpdateNotesModal
        modalOpened={NotesOpened}
        closeModal={CloseNotes}
        backlogItemId={backLogItem._id}
        backlogtitle={backLogItem.title}
      />
      <PreviewBackLogItem
        backlogItem={backLogItem}
        opened={previewModalOpened}
        close={closePreviewModal}
      />
      <CreateBackLogItemModal
        initialValues={backLogItem}
        opened={updateModalOpened}
        close={closeUpdateModal}
      />
    </div>
  );
};

export default BackLogItemInsideSprintcard;
