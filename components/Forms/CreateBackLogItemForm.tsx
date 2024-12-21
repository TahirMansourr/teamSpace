"use client";
import {
  Avatar,
  Button,
  Group,
  MultiSelect,
  MultiSelectProps,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Paper,
  Title,
  Divider,
} from "@mantine/core";
import React, { useState } from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { BackLogItemDto, UserDto } from "@/Utils/types";

type Priority = "Low" | "Medium" | "High";
type Status = "To Do" | "In Progress" | "Done" | "Review";
type Type = "Feature" | "Bug" | "Technical Debt" | "Improvement" | "Spike";

const CreateBackLogItemForm = ({
  close,
  initialValues,
}: {
  close: () => void;
  initialValues?: BackLogItemDto;
}) => {
  const { handleCreateBackLogItem, handleUpdateBackLogItem } = useBackLogContext();
  const { projectInfo } = useWorkSpaceContext();

  const dataForMultiSelect = projectInfo.project.team.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  const userData = projectInfo.project.team.reduce(
    (acc: Record<string, { image: string; email: string }>, user: UserDto) => {
      acc[user._id] = {
        image: user.image,
        email: user.email,
      };
      return acc;
    },
    {}
  );

  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => {
    const user = userData[option.value];
    return (
      <Group gap="sm">
        <Avatar src={user?.image || ""} size={36} radius="xl" />
        <div>
          <Text size="sm">{option.label}</Text>
          <Text size="xs" opacity={0.5}>
            {user?.email || ""}
          </Text>
        </div>
      </Group>
    );
  };

  const [values, setValues] = useState<{
    title: string;
    description: string;
    points: number;
    priority: Priority;
    status: Status;
    type: Type;
    acceptanceCriteria: string;
    assignee: string[];
    estimatedEffort: number;
  }>({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    priority: initialValues?.priority || "Medium",
    status: initialValues?.status || "To Do",
    type: initialValues?.type || "Feature",
    acceptanceCriteria: initialValues?.acceptanceCriteria || "",
    assignee: initialValues?.assignee ? initialValues.assignee.map(user => user._id) : [],
    estimatedEffort: initialValues?.estimatedEffort || 0,
    points: 0,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = {
      e,
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      type: values.type,
      acceptanceCriteria: values.acceptanceCriteria,
      assignee: values.assignee,
      estimatedEffort: values.estimatedEffort,
      points: values.points,
      close,
    };

    if (initialValues) {
      await handleUpdateBackLogItem({
        ...submitData,
        backlogItemId: initialValues._id,
      });
    } else {
      await handleCreateBackLogItem(submitData);
    }
  };

  return (
    <Paper shadow="sm" radius="md" p="xl" className="max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
        <Title order={2} className="text-center mb-6 text-gray-800">
          {initialValues ? 'Update Backlog Item' : 'Create New Backlog Item'}
        </Title>

        <div className="space-y-4">
          <TextInput
            label="Title"
            placeholder="Enter backlog item title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            size="md"
            required
          />

          <Textarea
            label="Description"
            value={values.description}
            placeholder="As a user I would like a feature to do a task"
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            minRows={3}
            size="md"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput
              label="Story Points"
              size="md"
              value={values.points}
              onChange={(e) => setValues({ ...values, points: e as number })}
              min={0}
            />
            <NumberInput
              label="Estimated Effort (hours)"
              size="md"
              value={values.estimatedEffort}
              onChange={(e) => setValues({ ...values, estimatedEffort: e as number })}
              min={0}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Priority"
              data={["High", "Medium", "Low"]}
              value={values.priority}
              onChange={(e) => setValues({ ...values, priority: e as Priority })}
              size="md"
            />
            <Select
              label="Status"
              data={["To Do", "In Progress", "Done", "Review"]}
              value={values.status}
              onChange={(e) => setValues({ ...values, status: e as Status })}
              size="md"
            />
            <Select
              label="Type"
              data={["Feature", "Bug", "Technical Debt", "Improvement", "Spike"]}
              value={values.type}
              onChange={(e) => setValues({ ...values, type: e as Type })}
              size="md"
            />
          </div>

          <Textarea
            label="Acceptance Criteria"
            value={values.acceptanceCriteria}
            placeholder="Define the conditions that must be met for this item to be considered complete"
            onChange={(e) => setValues({ ...values, acceptanceCriteria: e.target.value })}
            minRows={3}
            size="md"
          />

          <MultiSelect
            label="Assignee"
            data={dataForMultiSelect}
            value={values.assignee}
            onChange={(e) => setValues({ ...values, assignee: e })}
            renderOption={renderMultiSelectOption}
            searchable
            size="md"
          />
        </div>

        <Divider my="lg" />

        <Group justify="flex-end" mt="xl">
          <Button 
            variant="outline" 
            onClick={close}
            size="md"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="filled"
            className="bg-gray-800 hover:bg-gray-900"
            size="md"
          >
            {initialValues ? 'Update Item' : 'Create Item'}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default CreateBackLogItemForm;
