"use client";
import {
  Modal,
  Badge,
  Avatar,
  Group,
  Text,
  Paper,
  Stack,
  Divider,
} from "@mantine/core";
import { BackLogItemDto, UserDto } from "@/Utils/types";
import { IconCalendar, IconUser, IconCheckbox } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import UserModal from "@/components/UserModal";

interface PreviewBackLogItemProps {
  opened: boolean;
  close: () => void;
  backlogItem: BackLogItemDto;
}

const PreviewBackLogItem: React.FC<PreviewBackLogItemProps> = ({
  opened,
  close,
  backlogItem,
}) => {
  const [userModalOpened, { open: openUserModal, close: closeUserModal }] =
    useDisclosure();
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  // Status color mapping
  const getStatusColor = (status: string) => {
    const colors = {
      "To Do": "blue",
      "In Progress": "yellow",
      Done: "green",
    };
    return colors[status as keyof typeof colors];
  };

  // Type color mapping
  const getTypeColor = (type: string) => {
    const colors = {
      Feature: "indigo",
      Bug: "red",
      "Technical Debt": "orange",
      Improvement: "teal",
      Spike: "violet",
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xl"
      padding="lg"
      title={
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">
          Backlog Item Details
        </h1>
      }
    >
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800 ">
            {backlogItem.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge
              color={getTypeColor(backlogItem.type)}
              size="lg"
              className="px-3 py-1"
            >
              {backlogItem.type}
            </Badge>
            <Badge
              color={getStatusColor(backlogItem.status)}
              size="lg"
              className="px-3 py-1"
            >
              {backlogItem.status}
            </Badge>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Main Content */}
        <div className="bg-white  rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600 ">
              <IconCalendar size={18} />
              <span className="text-sm">
                {/* Created: {new Date(backlogItem.).toLocaleDateString()} */}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Description</h3>
              <p className="text-gray-600  leading-relaxed">
                {backlogItem.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">
                Acceptance Criteria
              </h3>
              <p className="text-gray-600  leading-relaxed">
                {backlogItem.acceptanceCriteria}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <IconCheckbox size={18} className="text-gray-500" />
                <span className="font-medium">
                  Effort: {backlogItem.estimatedEffort} points
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">
                  Priority: {backlogItem.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assignees Section */}
        <div className="bg-white  rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IconUser size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-800 ">Assignees</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {backlogItem.assignee.map((user: UserDto) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    openUserModal();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50  hover:bg-gray-100  cursor-pointer transition-colors"
                >
                  <Avatar
                    size="sm"
                    radius="xl"
                    src={user.image}
                    alt={user.username}
                    className="border-2 border-white "
                  />
                  <span className="text-sm font-medium text-gray-700 ">
                    {user.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <UserModal
          opened={userModalOpened}
          close={closeUserModal}
          user={selectedUser}
        />
      )}
    </Modal>
  );
};

export default PreviewBackLogItem;
