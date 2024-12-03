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
      className="bg-white rounded-lg  p-6"
    >
      <div className="space-y-4">
        <LoadingOverlay visible={formLoading} />

        <TextInput
          placeholder="Issue Name"
          label="Issue Name"
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("name")}
        />

        <Textarea
          placeholder="Description"
          label="Description"
          minRows={4}
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Priority"
            data={["LOW", "MEDIUM", "HIGH"]}
            classNames={{
              input: "border-gray-200 focus:border-blue-500 transition-colors",
              label: "text-gray-700 font-medium mb-1",
            }}
            {...form.getInputProps("priority")}
          />

          <DateInput
            valueFormat="DD/MM/YYYY HH:mm:ss"
            label="Due Date"
            placeholder="Select date"
            classNames={{
              input: "border-gray-200 focus:border-blue-500 transition-colors",
              label: "text-gray-700 font-medium mb-1",
            }}
            {...form.getInputProps("dueDate")}
          />
        </div>

        <TagsInput
          label="Tags"
          data={[]}
          leftSection={<div className="text-gray-500 font-bold">@</div>}
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
            pill: "bg-blue-100 text-blue-700",

            // tag: "bg-blue-100 text-blue-700"
          }}
          {...form.getInputProps("tags")}
        />

        <MultiSelect
          label="Assign Task To"
          data={projectInfo.project.team.map((member: UserDto) => ({
            label: member.username,
            value: member._id,
          }))}
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
            // item: "hover:bg-blue-50"
          }}
          {...form.getInputProps("assignedTo")}
        />

        <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
          {updateFormInput && (
            <Button
              color="red"
              onClick={openDeleteModal}
              variant="outline"
              className="hover:bg-red-50 transition-colors"
            >
              <MdOutlineDeleteSweep size={25} className="text-red-500" />
            </Button>
          )}
          <Button
            type="submit"
            size="md"
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {updateFormInput ? "Update Issue" : "Create Issue"}
          </Button>
        </div>

        {/* Modal styling */}
        <Modal
          opened={deleteModalOpened}
          onClose={closeDeleteModal}
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.8,
            blur: 6,
          }}
          className="bg-transparent"
        >
          <div className="flex flex-col items-center p-8 bg-white rounded-xl">
            <LoadingOverlay visible={formLoading} />
            <div className="mb-6 bg-red-50 p-4 rounded-full">
              <MdOutlineDeleteSweep size={50} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Delete Task
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              This action cannot be undone. Are you sure you want to delete this
              task?
            </p>
            <div className="flex gap-4">
              <Button
                onClick={closeDeleteModal}
                variant="outline"
                className="px-8 py-2 hover:bg-gray-50 transition-colors"
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
                  className="px-8 py-2 bg-red-500 hover:bg-red-600 transition-colors"
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
