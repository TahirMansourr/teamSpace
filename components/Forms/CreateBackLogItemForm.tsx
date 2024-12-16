import {
  Button,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";

const CreateBackLogItemForm = ({ close }: { close: () => void }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    points: 0,
    priority: "Medium",
    status: "To Do",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    close();
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
          <Select
            label="Priority"
            data={["High", "Medium", "Low"]}
            defaultValue="Medium"
            onChange={(e) => setValues({ ...values, priority: e as string })}
          />
        </div>
        <Select
          label="Status"
          data={["To Do", "In Progress", "Done", "Review"]}
          defaultValue="To Do"
          onChange={(e) => setValues({ ...values, status: e as string })}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateBackLogItemForm;
