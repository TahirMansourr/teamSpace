"use client";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import React from "react";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { CreateProductBackLog } from "@/lib/actions/ProductBackLogActions";

const CreateBackLogForm = () => {
  const [backlogName, setBacklogName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { projectInfo } = useWorkSpaceContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await CreateProductBackLog(projectInfo.project._id);
  };
  return (
    <div className="flex flex-col items-center justify-center  rounded-md  ">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            required
            label="Backlog Name"
            placeholder="Enter backlog name"
            value={backlogName}
            onChange={(e) => setBacklogName(e.target.value)}
          />

          <Textarea
            label="Description"
            placeholder="Describe your backlog"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
          />

          <Button type="submit" fullWidth>
            Create Backlog
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default CreateBackLogForm;
