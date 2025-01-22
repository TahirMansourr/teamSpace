"use client";

import {
  Button,
  LoadingOverlay,
  ScrollArea,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useSprintContext } from "../Contexts/SprintContext";
import BackLogTable from "../BackLogComponents/BackLog-Items/ProductBackLogTable";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { assign } from "nodemailer/lib/shared";
import AssignTeamMembers from "./AssignTeamMembers";

type CreateSprintType = {
  _id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  status: "planned" | "active" | "completed" | "cancelled";
  backlog: string;
  createdBy?: string;
  backlogItems?: string[];
  assignees?: string[];
};

const CreateSprintForm = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { selectedItems } = useBackLogContext();
  const { handleCreateSprint } = useSprintContext();

  const form = useForm<any>({
    initialValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      goal: "",
      status: "Planning",
      backlogItems: [],
      assignees: [],
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
      endDate: (value, values) =>
        value < values.startDate ? "End date must be after start date" : null,
      goal: (value) =>
        value.length < 10 ? "Goal must be at least 10 characters" : null,
    },
  });

  const handleSubmit = async (values: CreateSprintType) => {
    setLoading(true);

    try {
      if (selectedItems.length > 0) {
        handleCreateSprint({ ...values, backlogItems: selectedItems });
      }
      handleCreateSprint(values);
    } catch (error) {
      console.error("Error creating sprint:", error);
    } finally {
      setLoading(false);
      close();
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="bg-white rounded-lg p-6"
    >
      <div className="space-y-4">
        <LoadingOverlay visible={loading} />

        <TextInput
          label="Sprint Name"
          placeholder="Enter sprint name"
          required
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("name")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput
            label="Start Date"
            placeholder="Select start date"
            required
            classNames={{
              input: "border-gray-200 focus:border-blue-500 transition-colors",
              label: "text-gray-700 font-medium mb-1",
            }}
            {...form.getInputProps("startDate")}
          />

          <DateInput
            label="End Date"
            placeholder="Select end date"
            required
            classNames={{
              input: "border-gray-200 focus:border-blue-500 transition-colors",
              label: "text-gray-700 font-medium mb-1",
            }}
            {...form.getInputProps("endDate")}
          />
        </div>

        <Textarea
          label="Sprint Goal"
          placeholder="Enter sprint goal"
          required
          minRows={4}
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("goal")}
        />

        <Select
          label="Status"
          data={[
            { value: "planned", label: "Planned" },
            { value: "active", label: "Active" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          required
          classNames={{
            input: "border-gray-200 focus:border-blue-500 transition-colors",
            label: "text-gray-700 font-medium mb-1",
          }}
          {...form.getInputProps("status")}
        />

        <AssignTeamMembers
          value={form.values.assignees}
          onChange={(value) => form.setFieldValue("assignees", value)}
        />
        <ScrollArea>
          <BackLogTable isSelectingForSprint={true} />
        </ScrollArea>

        <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={close}
            className="hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Create Sprint
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateSprintForm;
