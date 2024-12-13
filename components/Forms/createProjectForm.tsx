"use client";
import { CreateProject } from "@/lib/actions/ProjectActions";
import { Button, LoadingOverlay, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useProjectContext } from "../Contexts/ProjectContext";
import { notifications } from "@mantine/notifications";
import AddUsers from "../TeamWorkSpaceComponents/SettingsComponents/AddUsers";
import { GetUsersByIds } from "@/lib/actions/UserActions";

interface ProjectFormDto {
  name: string;
  team: string[];
  image: string;
  content: string;
  wantedTeamMember: string;
}
const CreateProjectForm = ({
  close,
  userId,
}: {
  close: () => void;
  userId: string;
}) => {
  const { setUserProjects } = useProjectContext();

  const form = useForm<ProjectFormDto>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      team: [],
      image: "",
      content: "",
      wantedTeamMember: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<{
    status: string;
    message: string;
    project: any;
  }>();
  const [TeamMembersIds, setTeamMembersIds] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);
  const [wantedUser, setWantedUser] = useState<{
    name: string;
    id: string;
    email: string;
  }>();
  const [data, setdata] = useState<
    { name: string; id: string; email: string; image: string }[]
  >([]);

  async function handleSubmit() {
    const values = form.getValues();
    setLoading(true);
    // const TeamMembersIds = values.team.map((memberName: string) => {
    //   const membersId = data.find((item) => item.name === memberName);
    //   return membersId?.id;
    // });
    console.log("🚀 ~ TeamMembersIds ~ TeamMembersIds:", TeamMembersIds);
    try {
      CreateProject({
        name: values.name,
        image: values.image,
        content: values.content,
        admins: [userId],
        team: TeamMembersIds,
      }).then((res: any) => {
        const newProjectId = res.project._id;
        console.log(
          "🚀 ~ file: createProjectForm.tsx:73 ~ newProjectId:",
          newProjectId
        );
        setResponse(res);
        GetUsersByIds(TeamMembersIds).then((res) => {
          // setdata(res.users);
          setUserProjects((prev: any) => [
            ...prev,
            {
              _id: newProjectId,
              name: values.name,
              image: values.image,
              content: values.content,
              admins: [userId],
              team: res.users,
            },
          ]);
        });
        notifications.show({
          message: res.message,
          color: "green",
        });
      });
      console.log(form.getValues());
      close();
    } catch (error: any) {
      console.log(`error at createProjectForm : ${error}`);
    } finally {
      setLoading(false);
    }
  }

  // async function handleSearch() {
  //   const param = form.getValues().wantedTeamMember;
  //   setOverlayLoading(true);
  //   try {
  //     const requiredUser = await FindUser(param);
  //     setWantedUser(requiredUser.user);
  //   } catch (error: any) {
  //     throw new Error(`rrrrrrr : ${error}`);
  //   } finally {
  //     setOverlayLoading(false);
  //   }
  // }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <div className=" w-full flex flex-col justify-center gap-1 ">
          <TextInput
            label="Project Name"
            placeholder="Project Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="Enter Project Description"
            key={form.key("content")}
            {...form.getInputProps("content")}
          />
          <AddUsers
            onChange={(selectedUsers) => {
              console.log(
                "🚀 ~ file: createProjectForm.tsx:139 ~ selectedUsers:",
                selectedUsers
              );
              console.log(
                "🚀 ~ file: createProjectForm.tsx:137 ~ team:",
                form.values.team
              );
              form.setFieldValue("team", selectedUsers);
              setTeamMembersIds(selectedUsers);
              console.log(
                "🚀 ~ file: createProjectForm.tsx:149 ~ setTeamMembersIds:",
                TeamMembersIds
              );
            }}
          />
          {response && response.status === "Fail" ? (
            <div
              className={`p-3 rounded-md text-white w-fit mx-auto mt-4 text-center  bg-red-600`}
            >
              {response.message}
            </div>
          ) : null}
          <Button type="submit" className=" mt-3">
            Create Project
          </Button>
        </div>
      )}
    </form>
  );
};

export default CreateProjectForm;
