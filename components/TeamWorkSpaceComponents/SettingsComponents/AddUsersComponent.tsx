"use client";
import { AddUsersToProject } from "@/lib/actions/ProjectActions";
import React, { useState } from "react";
import AddUsers from "./AddUsers";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext";

const AddUsersComponent = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { projectInfo } = useWorkSpaceContext();

  const onchange = (value: string[]) => {
    setSelectedUsers(value);
  };

  const handleAddUsers = async () => {
    if (selectedUsers.length === 0) {
      notifications.show({
        title: "Error",
        message: "Please select users to add to the project",
        color: "red",
      });
      return;
    }

    const response = await AddUsersToProject({
      projectId: projectInfo.project._id,
      userIds: selectedUsers,
    });

    if (response.status === "success") {
      notifications.show({
        title: "Success",
        message: response.message,
        color: "green",
      });
      setSelectedUsers([]); // Reset selection
    } else {
      notifications.show({
        title: "Error",
        message: response.message,
        color: "red",
      });
    }
  };

  return (
    <div className="flex flex-col  font-medium">
      <h4>Add users</h4>
      <AddUsers onChange={onchange} />
      <Button
        onClick={handleAddUsers}
        disabled={selectedUsers.length === 0}
        color="blue"
      >
        Add Selected Users
      </Button>
    </div>
  );
};

export default AddUsersComponent;
