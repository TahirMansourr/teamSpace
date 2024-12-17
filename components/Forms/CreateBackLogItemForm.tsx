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
} from "@mantine/core";
import React, { useState } from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { UserDto } from "@/Utils/types";

type Priority = "Low" | "Medium" | "High";
type Status = "To Do" | "In Progress" | "Done" | "Review";
type Type = "Feature" | "Bug" | "Technical Debt" | "Improvement" | "Spike";

const CreateBackLogItemForm = ({ close }: { close: () => void }) => {
  const { handleCreateBackLogItem } = useBackLogContext();
  const { projectInfo } = useWorkSpaceContext();

  // Prepare data for MultiSelect
  const dataForMultiSelect = projectInfo.project.team.map((user) => ({
    value: user._id, // Use user._id as the value
    label: user.username, // Display username as the label
  }));

  // Create userData object with _id as the key
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

  // Render MultiSelect option with Avatar
  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => {
    const user = userData[option.value]; // Use user._id as the key to find user details
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
    title: "",
    description: "",
    points: 0,
    priority: "Low",
    status: "To Do",
    type: "Feature",
    acceptanceCriteria: "",
    assignee: [],
    estimatedEffort: 0,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleCreateBackLogItem({
      e,
      acceptanceCriteria: [values.acceptanceCriteria],
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      type: values.type,
      assignee: values.assignee,
      estimatedEffort: values.estimatedEffort,
      close,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextInput
          label="Title"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <Textarea
          label="Description"
          placeholder="As a user I would like a feature to do a task"
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
        />
        <div className="flex justify-between gap-4">
          <NumberInput
            label="Points"
            size="sm"
            onChange={(e) => setValues({ ...values, points: e as number })}
          />
          <NumberInput
            label="Estimated Effort"
            size="sm"
            onChange={(e) =>
              setValues({ ...values, estimatedEffort: e as number })
            }
          />
        </div>
        <Select
          label="Priority"
          data={["High", "Medium", "Low"]}
          defaultValue="Medium"
          onChange={(e) => setValues({ ...values, priority: e as Priority })}
        />
        <Select
          label="Status"
          data={["To Do", "In Progress", "Done", "Review"]}
          defaultValue="To Do"
          onChange={(e) => setValues({ ...values, status: e as Status })}
        />
        <Select
          label="Type"
          data={["Feature", "Bug", "Technical Debt", "Improvement", "Spike"]}
          defaultValue="Feature"
          onChange={(e) => setValues({ ...values, type: e as Type })}
        />
        <Textarea
          label="Acceptance Criteria"
          placeholder="As a user I would like a feature to do a task"
          onChange={(e) =>
            setValues({ ...values, acceptanceCriteria: e.target.value })
          }
        />
        <MultiSelect
          label="Assignee"
          data={dataForMultiSelect} // Use team member IDs
          onChange={(e) => setValues({ ...values, assignee: e })}
          renderOption={renderMultiSelectOption}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateBackLogItemForm;
