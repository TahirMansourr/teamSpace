"use client";
import {
  Button,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";

const CreateBackLogForm = ({ close }: { close: () => void }) => {
  const [backlogName, setBacklogName] = React.useState<string | undefined>();
  const [description, setDescription] = React.useState<string | undefined>();
  const { handleCreateBackLog, loading } = useBackLogContext();

  const handleSubmit = async (e: React.FormEvent) => {
    handleCreateBackLog(e, backlogName, description, close);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col  gap-3  rounded-md w-full ">
        <LoadingOverlay visible={loading} />
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
          minRows={5}
        />

        <Button type="submit" fullWidth>
          Create Backlog
        </Button>
      </div>
    </form>
  );
};

export default CreateBackLogForm;
