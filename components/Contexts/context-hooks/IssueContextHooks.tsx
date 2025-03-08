import { createOrUpdateIssueForm } from "@/components/Forms/createOrUpdateIssue";
import {
  CreateIssue,
  DeleteIssue,
  UpdateIssue,
} from "@/lib/actions/IssueActions";
import { socket } from "@/socket";
import { ProjectDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

type IssuesActions = {
  project: ProjectDto;
  userInfo: UserDto;
};
export const useIssuesActions = ({ project, userInfo }: IssuesActions) => {
  const [formLoading, setFormLoading] = useState<boolean>(false);

  async function handleCreateIssue(
    values: createOrUpdateIssueForm,
    close: () => void
  ) {
    const assignedToMembers = values.assignedTo
      .map((id) => {
        const assignedToMember = project.team.find(
          (member: UserDto) => id === member._id
        );
        return assignedToMember;
      })
      .filter((id): id is UserDto => id !== undefined);

    try {
      setFormLoading(true);
      CreateIssue({
        assignedTo: values.assignedTo,
        description: values.description,
        dueDate: values.dueDate,
        name: values.name,
        priority: values.priority,
        projectId: project._id,
        status: values.status,
        tags: values.tags,
        userId: userInfo._id,
        backlogItemId: values.backlogItemId,
        backlogtitle: values.backlogtitle,
      }).then((res) => {
        const newIssue = {
          ...values,
          _id: res.issue._id,
          assignedTo: assignedToMembers as UserDto[],
          creationDate: res.issue.creationDate,
          createdBy: userInfo,
        };

        socket.emit("createIssue", { room: project._id, value: newIssue });
        notifications.show({
          message: `${newIssue.name} Created`,
          color: "green",
        });
      });
    } catch (error) {
      notifications.show({
        message: `"Error at handleCreateIssue" ${error}`,
        color: "red",
      });
      throw new Error(`error at handleCreateIssue : ${error}`);
    } finally {
      setFormLoading(false);
      close;
    }
  }
  async function handleUpdateIssue(
    values: createOrUpdateIssueForm,
    close: () => void
  ) {
    const assignedToMembers = values.assignedTo
      .map((name) => {
        const assignedToMember = project.team.find(
          (member: UserDto) => name === member.username
        );
        return assignedToMember;
      })
      .filter((id): id is UserDto => id !== undefined);

    try {
      setFormLoading(true);
      UpdateIssue({
        _id: values._id as string,
        assignedTo: assignedToMembers.map((member: UserDto | undefined) =>
          member ? member._id : ""
        ),
        description: values.description,
        dueDate: values.dueDate,
        name: values.name,
        priority: values.priority,
        projectId: project._id,
        status: values.status,
        tags: values.tags,
        userId: userInfo._id,
      }).then((res) => {
        const createdBy = project.team.find(
          (member: UserDto) => member._id === res.task.createdBy
        );
        const newIssue = {
          ...values,
          _id: values._id as string,
          assignedTo: assignedToMembers as UserDto[],
          creationDate: res.task.creationDate,
          lastModified: res.task.lastModified,
          createdBy,
        };

        socket.emit("updateIssue", { room: project._id, value: newIssue });
        notifications.show({
          message: `${newIssue.name} Updated`,
          color: "green",
        });
      });
    } catch (error) {
      notifications.show({
        message: `"Error at handleCreateIssue" ${error}`,
        color: "red",
      });
      throw new Error(`error at handleCreateIssue : ${error}`);
    } finally {
      setFormLoading(false);
      close;
    }
  }
  async function handleDeleteIssue(
    issueId: string,
    close: () => void,
    closeMainModal: () => void
  ) {
    try {
      setFormLoading(true);
      await DeleteIssue({
        issueId: issueId,
        projectId: project._id,
        userId: userInfo._id,
      });

      // Update both issue lists by filtering out the deleted issue
      //   setIssuesInfo((prev: IssueDto[]) =>
      //     prev.filter((issue) => issue._id !== issueId)
      //   );
      //   setAllFeatureIssues((prev: IssueDto[]) =>
      //     prev.filter((issue) => issue._id !== issueId)
      //   );
      socket.emit("deleteIssue", { room: project._id, value: issueId });
      notifications.show({ message: `Issue Deleted`, color: "green" });
    } catch (error) {
      notifications.show({
        message: `"Error at handleDeleteIssue" ${error}`,
        color: "red",
      });
      throw new Error(`error at handleDeleteIssue: ${error}`);
    } finally {
      setFormLoading(false);
      close;
    }
  }
  return {
    handleCreateIssue,
    handleUpdateIssue,
    handleDeleteIssue,
    formLoading,
  };
};
