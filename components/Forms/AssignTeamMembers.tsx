import React from "react";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { UserDto } from "@/Utils/types";
import {
  Avatar,
  Group,
  MultiSelect,
  MultiSelectProps,
  Text,
} from "@mantine/core";

const AssignTeamMembers = ({
  defaultvalue,
  onChange,
  value,
}: {
  onChange: (e: any | string[]) => void;
  value: any;
  defaultvalue?: string[];
}) => {
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

  return (
    <MultiSelect
      label="Assignee"
      data={dataForMultiSelect}
      value={value}
      onChange={onChange}
      //   value={values.assignee}
      //   onChange={(e) => setValues({ ...values, assignee: e })}
      renderOption={renderMultiSelectOption}
      searchable
      size="md"
      defaultValue={defaultvalue}
    />
  );
};

export default AssignTeamMembers;
