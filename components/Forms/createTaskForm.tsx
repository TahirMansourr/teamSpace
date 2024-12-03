"use client";

import {
  Badge,
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
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { UserDto } from "@/Utils/types";

export type createTaskFormDto = {
  name: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: Date;
  assignedTo: string[];
  tags: string[];
  status: "To Do" | "In Progress" | "Done" | "Review";
  _id?: string;
  featureId?: string;
  createdBy?: UserDto;
};

const CreateOrUpdateTaskForm = ({
  close,
  updateFormInput,
  featureId,
}: {
  close: Function;
  updateFormInput?: createTaskFormDto;
  featureId?: string;
}) => {
  const form = useForm<createTaskFormDto>({
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

  const { useHandleCreateTask, projectInfo } = useTaskContext();
  const [formLoading, handleCreateTask, handleUpdateTask, handleDeleteTask] =
    useHandleCreateTask();
  const [open, setOpen] = useState<boolean>(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        !updateFormInput
          ? handleCreateTask(values, close())
          : handleUpdateTask(values, close())
      )}
      className="bg-white rounded-lg flex flex-col w-full h-full"
    >
      <div className="p-6 space-y-4">
        <LoadingOverlay visible={formLoading} />

        <TextInput
          placeholder="Task Name"
          label="Task Name"
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("name")}
        />

        <Textarea
          placeholder="Task Description"
          label="Task Description"
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
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
            pill: "bg-blue-100 text-blue-700",
          }}
          {...form.getInputProps("tags")}
        />

        <MultiSelect
          label="Assign Task To"
          data={projectInfo.team.map((member: any) => ({
            label: member.username,
            value: member.username,
          }))}
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("assignedTo")}
        />
      </div>

      <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        {updateFormInput && (
          <div>
            <p className="font-bold">
              By:{" "}
              <Badge size="lg" className="bg-blue-100 text-blue-700">
                {updateFormInput?.createdBy?.username}
              </Badge>
            </p>
          </div>
        )}
        <div className="flex gap-2">
          {updateFormInput && (
            <Button
              color="red"
              variant="outline"
              onClick={openDeleteModal}
              className="hover:bg-red-50 transition-colors"
            >
              <MdOutlineDeleteSweep size={25} className="text-red-500" />
            </Button>
          )}
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {updateFormInput ? "Update Task" : "Create Task"}
          </Button>
        </div>
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
        <div className="flex flex-col items-center p-8 bg-white rounded-xl">
          <LoadingOverlay visible={formLoading} />
          <div className="mb-6 bg-red-50 p-4 rounded-full">
            <MdOutlineDeleteSweep size={50} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Delete Task</h2>
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
                  handleDeleteTask(
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
    </form>
  );
};

export default CreateOrUpdateTaskForm;
