"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Avatar, MultiSelect } from "@mantine/core";
import { useState } from "react";
import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext";
import { RemoveUsersFromProject } from "@/lib/actions/ProjectActions";
import { notifications } from "@mantine/notifications";

const RemoveUserComponent = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { projectInfo } = useWorkSpaceContext();

  const teamMembers = projectInfo.project.team.map((user) => ({
    value: user._id,
    label: ` ${user.username}  (${user.email})`,
  }));

  const selectedUserDetails = projectInfo.project.team.filter((user) =>
    selectedUsers.includes(user._id)
  );

  const handleRemoveUsers = () => {
    setLoading(true);
    try {
      RemoveUsersFromProject({
        projectId: projectInfo.project._id,
        userIds: selectedUsers,
      }).then((res: { message: string; status: string }) => {
        if (res.status === "success") {
          setLoading(false);
          notifications.show({
            title: "Success",
            message: res.message,
            color: "green",
          });
          close();
        } else {
          setLoading(false);
          notifications.show({
            title: "Error",
            message: res.message,
            color: "red",
          });
        }
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <span className="text-xl font-semibold">Confirm User Removal</span>
        }
        centered
        size="md"
        radius="lg"
        padding="xl"
      >
        <div className="space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Are you sure you want to remove the following users?
          </p>
          <ul className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {selectedUserDetails.map((user, index) => (
              <li
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all duration-200 hover:shadow-md"
              >
                <Avatar
                  src={user.image}
                  radius="xl"
                  size="lg"
                  className="border-2 border-gray-200 dark:border-gray-700"
                ></Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {user.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="subtle" onClick={close} size="md" radius="md">
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleRemoveUsers}
              size="md"
              radius="md"
              className="hover:bg-red-600"
            >
              Remove Users
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col font-medium ">
        <h4>Remove users</h4>
        <MultiSelect
          data={teamMembers}
          value={selectedUsers}
          onChange={setSelectedUsers}
          placeholder="Select users to remove"
          mb={2}
        />
        <Button
          color="red"
          onClick={open}
          disabled={selectedUsers.length === 0}
        >
          Remove Selected Users
        </Button>
      </div>
    </>
  );
};

export default RemoveUserComponent;
