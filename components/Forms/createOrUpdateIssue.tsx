"use client";

import {
  Button,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useTaskContext } from "../Contexts/TasksContext";
import { UserDto } from "@/Utils/types";
import { useIssuesContext } from "../Contexts/IssuesContext";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { useDisclosure } from "@mantine/hooks";
import { MdOutlineDeleteSweep } from "react-icons/md";

export type createOrUpdateIssueForm = {
  name: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: Date;
  assignedTo: string[];
  tags: string[];
  status: "To Do" | "In Progress" | "Done" | "Review";
  _id?: string;
  featureId?: string;
};

const CreateOrUpdateIssueForm = ({
  close,
  updateFormInput,
  featureId,
}: {
  close: Function;
  updateFormInput?: createOrUpdateIssueForm;
  featureId?: string;
}) => {
  const form = useForm<createOrUpdateIssueForm>({
    mode: "uncontrolled",
    initialValues: {
      name: updateFormInput ? updateFormInput.name : "",
      description: updateFormInput ? updateFormInput.description : "",
      priority: updateFormInput ? updateFormInput.priority : "HIGH",
      dueDate: updateFormInput ? updateFormInput.dueDate : new Date(),
      assignedTo: updateFormInput ? updateFormInput.assignedTo : [],
      tags: updateFormInput ? updateFormInput.tags : [],
      status: updateFormInput ? updateFormInput.status : "To Do",
      _id: updateFormInput ? updateFormInput._id : "",
      featureId: featureId ? featureId : "",
    },
  });

  const [open, setOpen] = useState<boolean>(false);
  const {
    formLoading,
    handleCreateIssue,
    handleUpdateIssue,
    handleDeleteIssue,
  } = useIssuesContext();
  const { projectInfo } = useWorkSpaceContext();
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        !updateFormInput
          ? handleCreateIssue(values, close())
          : handleUpdateIssue(values, close())
      )}
    >
      <div>
        <LoadingOverlay visible={formLoading} />
        <TextInput
          placeholder="Issue Name"
          label="Issue Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <Select
          label="Priority"
          data={["LOW", "MEDIUM", "HIGH"]}
          key={form.key("priority")}
          {...form.getInputProps("priority")}
        />
        <TagsInput
          label="Tags"
          data={[]}
          key={form.key("tags")}
          {...form.getInputProps("tags")}
        />
        <DateInput
          valueFormat="DD/MM/YYYY HH:mm:ss"
          label="Date input"
          placeholder="Date input"
          key={form.key("dueDate")}
          {...form.getInputProps("dueDate")}
          className={`${open ? "mt-10" : null}`}
        />
        <MultiSelect
          label="Assign Task To"
          data={projectInfo.project.team.map((member: UserDto) => {
            return { label: member.username, value: member._id };
          })}
          key={form.key("assignedTo")}
          {...form.getInputProps("assignedTo")}
        />
        <div className="w-full mt-5 flex gap-2 justify-end items-center">
          {updateFormInput && (
            <Button color="red" onClick={openDeleteModal} variant="outline">
              <MdOutlineDeleteSweep
                size={25}
                className="text-red-500"
                onClick={openDeleteModal}
              />
            </Button>
          )}
          <Button type="submit" size="sm">
            {updateFormInput ? "Update Issue" : "Create Issue"}
          </Button>
        </div>
        <Modal
          opened={deleteModalOpened}
          onClose={closeDeleteModal}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.8,
            blur: 4,
          }}
          className="bg-transparent"
        >
          <div className="flex flex-col items-center p-6 text-center">
            <LoadingOverlay visible={formLoading} />
            <div className="mb-5">
              <MdOutlineDeleteSweep size={50} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Delete Task</h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Are you sure you want to delete this
              task?
            </p>
            <div className="flex gap-4">
              <Button
                onClick={closeDeleteModal}
                variant="outline"
                className="px-6"
              >
                No, Keep It
              </Button>
              {updateFormInput && (
                <Button
                  onClick={() =>
                    handleDeleteIssue(
                      updateFormInput._id as string,
                      closeDeleteModal,
                      close()
                    )
                  }
                  color="red"
                  className="px-6"
                >
                  Yes, Delete
                </Button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default CreateOrUpdateIssueForm;
