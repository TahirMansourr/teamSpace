"use client";
import { Modal, Card, Avatar, Badge } from "@mantine/core";
import React from "react";
import { UserDto } from "@/Utils/types";

interface UserModalProps {
  opened: boolean;
  close: () => void;
  user: UserDto;
}

const UserModal = ({ opened, close, user }: UserModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="User Details"
      size="lg"
      withCloseButton
      centered
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex justify-center p-4 bg-gray-50">
          <Avatar
            src={user.image}
            size="xl"
            radius="xl"
            alt={user.username}
          />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{user.username}</h3>
            {user.isAdmin && (
              <Badge color="blue" variant="light">
                Admin
              </Badge>
            )}
          </div>

          <p className="text-sm text-gray-600">
            Email: {user.email}
          </p>

          <div className="flex justify-between items-center">
            <Badge 
              color={user.isVerified ? "green" : "red"} 
              variant="light"
            >
              {user.isVerified ? "Verified" : "Not Verified"}
            </Badge>
            <span className="text-sm text-gray-600">
              Projects: {user.projects.length}
            </span>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default UserModal;
