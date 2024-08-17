'use client'
import { useWorkSpaceContext } from '@/components/Contexts/WorkSpaceContext';
import { createFeature } from '@/lib/actions/FeatureAction';
import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function CreateFeatureForm() {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description : '',
    },
  });

  const {projectInfo , userInfo} = useWorkSpaceContext()

  async function handleSubmit(values : {name : string , description : string}){
    await createFeature({
        name : values.name,
        description : values.description,
        projectId : projectInfo.project._id,
        userId : userInfo._id
    })
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        withAsterisk
        label="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <Textarea
       autosize
       label="Description"
       key={form.key('description')}
       {...form.getInputProps('description')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Create</Button>
      </Group>
    </form>
  );
}

export default CreateFeatureForm