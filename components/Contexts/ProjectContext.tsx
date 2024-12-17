"use client";

import {
  DeleteProject,
  RearrangeUserProjectsArray,
} from "@/lib/actions/ProjectActions";
import { ProjectDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface ProjectContextDto {
  userProjects: ProjectDto[];
  setUserProjects: Dispatch<SetStateAction<ProjectDto[]>>;
  loading: boolean;
  deleteProject: (projectId: string) => Promise<void>;
  rearrangeProjects: (projects: ProjectDto[]) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextDto>(
  {} as ProjectContextDto
);
export const useProjectContext = () => {
  return useContext(ProjectContext);
};

const ProjectProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDto;
}) => {
  const [userProjects, setUserProjects] = useState<ProjectDto[]>(user.projects);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("🚀 ~ userProjects:", userProjects);

  //you can use useMemo here on the value to optimize the rerendering

  const deleteProject = async (projectId: string) => {
    try {
      setLoading(true);
      await DeleteProject(projectId);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error as string,
        color: "red",
      });
    } finally {
      setUserProjects(
        userProjects.filter((project) => project._id !== projectId)
      );

      setLoading(false);
    }
  };

  async function rearrangeProjects(projects: ProjectDto[]) {
    try {
      const requiredProjects = projects.map((project) => project._id);
      setLoading(true);
      await RearrangeUserProjectsArray({
        projectsArray: requiredProjects,
        userId: user._id,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error as string,
        color: "red",
      });
    } finally {
      setLoading(false);
      setUserProjects(projects);
    }
  }

  const value = useMemo(
    () => ({
      userProjects,
      setUserProjects,
      loading,
      deleteProject,
      rearrangeProjects,
    }),
    [userProjects, setUserProjects, loading, deleteProject, rearrangeProjects]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
