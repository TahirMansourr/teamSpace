"use client";
import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext";
import { createFeature } from "@/lib/actions/FeatureAction";
import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFeatureContext } from "../Contexts/featureContext";

function CreateFeatureForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
    },
  });

  const { submitCreateFeatureForm } = useFeatureContext();

  // async function handleSubmit(values : {name : string , description : string}){
  //   await createFeature({
  //       name : values.name,
  //       description : values.description,
  //       projectId : projectInfo.project._id,
  //       userId : userInfo._id
  //   })
  // }

  return (
    <form
      onSubmit={form.onSubmit((values) => submitCreateFeatureForm(values))}
      className="bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Feature name"
        classNames={{
          input: "border-gray-200 focus:border-blue-500 transition-colors",
          label: "text-gray-700 font-medium mb-1",
        }}
        {...form.getInputProps("name")}
      />

      <Textarea
        autosize
        minRows={4}
        label="Description"
        placeholder="Describe your feature"
        classNames={{
          input: "border-gray-200 focus:border-blue-500 transition-colors",
          label: "text-gray-700 font-medium mb-1",
        }}
        {...form.getInputProps("description")}
      />

      <Group
        justify="flex-end"
        mt="md"
        className="pt-4 border-t border-gray-100"
      >
        <Button
          type="submit"
          size="md"
          className="bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Create Feature
        </Button>
      </Group>
    </form>
  );
}

export default CreateFeatureForm;
