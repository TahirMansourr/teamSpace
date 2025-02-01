"use client";
import { CreateTask, DeleteTask, UpdateTask } from "@/lib/actions/TaskActions";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { socket } from "@/socket";
import { ProjectDto, TaskDto, UserDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";

type formValuesType = {
  name: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: Date;
  assignedTo: string[];
  tags: string[];
  status: "To Do" | "In Progress" | "Done" | "Review";
  _id?: string;
  featureId?: string;
  backlogItemId?: string;
  backlogtitle?: string;
};
type TaskContextDto = {
  useHandleCreateTask: () => [
    boolean,
    (values: formValuesType, close: () => void) => Promise<void>,
    (values: formValuesType, close: () => void) => Promise<void>,
    (
      taskId: string,
      close: () => void,
      closeMainModal: () => void
    ) => Promise<void>
  ];
  projectInfo: ProjectDto;
  allTasks: TaskDto[];
  allFeatureTasks: TaskDto[];
  formLoading: boolean;
};
const TaskContext = createContext<TaskContextDto>({} as TaskContextDto);
export const useTaskContext = () => {
  return useContext(TaskContext);
};

const TaskProvider = ({
  children,
  user,
  project,
  featureTasks,
}: {
  children: React.ReactNode;
  user: UserDto;
  project: {
    status: string;
    message: string;
    project: ProjectDto;
  };
  featureTasks?: TaskDto[];
}) => {
  const [userInfo] = useState<UserDto>(user);
  const [projectInfo] = useState<ProjectDto>(project.project);
  const [allTasks, setAllTasks] = useState<TaskDto[]>(
    project.project.Tasks ? project.project.Tasks : []
  );
  const [allFeatureTasks, setAllFeatureTasks] = useState<TaskDto[]>(
    featureTasks ? featureTasks : []
  );
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const useHandleCreateTask = (): [
    boolean,
    (values: formValuesType, close: () => void) => Promise<void>,
    (values: formValuesType, close: () => void) => Promise<void>,
    (
      taskId: string,
      close: () => void,
      closeMainModal: () => void
    ) => Promise<void>
  ] => {
    async function handleCreateTask(values: formValuesType, close: () => void) {
      console.log("🚀 ~ handleCreateTask ~ values:", values);
      setFormLoading(true);
      const assignedToMembers = values.assignedTo
        .map((name) => {
          const assignedToMember = projectInfo.team.find(
            (member: UserDto) => name === member.username
          );
          return assignedToMember;
        })
        .filter((id): id is UserDto => id !== undefined);
      try {
        CreateTask({
          name: values.name,
          assignedTo: assignedToMembers
            ? assignedToMembers.map((member: UserDto | undefined) =>
                member ? member._id : ""
              )
            : [],
          description: values.description,
          dueDate: values.dueDate,
          priority: values.priority,
          userId: userInfo._id,
          projectId: projectInfo._id,
          tags: values.tags,
          status: values.status,
          featureId: values.featureId,
          backlogItemId : values.backlogItemId,
          backlogtitle : values.backlogtitle
        }).then((res) => {
          const newTask = {
            ...values,
            assignedTo: assignedToMembers,
            _id: res.task._id,
            creationDate: res.task.creationDate,
            createdBy: userInfo,
          };
          console.log("🚀 ~ file: TasksContext.tsx:97 ~ newTask:", newTask);
          socket.emit("createTask", { room: projectInfo._id, value: newTask });
        });
      } catch (error) {
        throw new Error(`error at handleCreateTask : ${error}`);
      } finally {
        setFormLoading(false);
        close;
      }
    }
    async function handleUpdateTask(values: formValuesType, close: () => void) {
      setFormLoading(true);
      const assignedToMembers = values.assignedTo
        .map((name) => {
          const assignedToMember = projectInfo.team.find(
            (member: UserDto) => name === member.username
          );
          return assignedToMember;
        })
        .filter((id): id is UserDto => id !== undefined);
      try {
        await UpdateTask({
          _id: values._id as string,
          name: values.name,
          assignedTo: assignedToMembers.map((member: UserDto | undefined) =>
            member ? member._id : ""
          ),
          description: values.description,
          dueDate: values.dueDate,
          priority: values.priority,
          userId: userInfo._id,
          projectId: projectInfo._id,
          tags: values.tags,
          status: values.status,
        }).then((res: { status: string; task: TaskDto }) => {
          const newTask = {
            ...values,
            _id: res.task._id,
            assignedTo: assignedToMembers,
            creationDate: res.task.creationDate,
            createdBy: userInfo,
          };

          socket.emit("updateTask", {room : projectInfo._id , value : newTask});
        });
      } catch (error) {
        throw new Error(`error at handleCreateTask : ${error}`);
      } finally {
        setFormLoading(false);
        close;
      }
    }
    async function handleDeleteTask(
      taskId: string,
      close: () => void,
      closeMainModal: () => void
    ) {
      setFormLoading(true);
      try {
        const response = await DeleteTask(taskId);
        if (response.status === "success") {
          socket.emit("deleteTask", { room: projectInfo._id, value : taskId });
        }
      } catch (error) {
        notifications.show({ message: "Error deleting task", color: "red" });
        throw new Error(`Error at handleDeleteTask: ${error}`);
      } finally {
        setFormLoading(false);
        close();
        closeMainModal;
      }
    }
    return [formLoading, handleCreateTask, handleUpdateTask, handleDeleteTask];
  };

  useEffect(() => {
    socket.on("createTask", (task: TaskDto) => {
      setAllTasks((prev: TaskDto[] | undefined) =>
        prev ? [task, ...prev] : [task]
      );
      if (task.featureId) {
        setAllFeatureTasks((prev: TaskDto[] | undefined) =>
          prev ? [task, ...prev] : []
        );
      }
    });
    socket.on("updateTask", (task: TaskDto) => {
      console.log("recieved the task", task);
      setAllTasks((prev: TaskDto[]) =>
        prev.map((prevTask: TaskDto) =>
          prevTask._id === task._id ? task : prevTask
        )
      );
      setAllFeatureTasks((prev: TaskDto[]) =>
        prev.map((prevTask: TaskDto) =>
          prevTask._id === task._id ? task : prevTask
        )
      );
    });
    socket.on("deleteTask", (taskId: string) => {
      setAllTasks((prev: TaskDto[]) =>
        prev.filter((task) => task._id !== taskId)
      );
      setAllFeatureTasks((prev: TaskDto[]) =>
        prev.filter((task) => task._id !== taskId)
      );
    });
    return () => {
      socket.off("createTask");
      socket.off("updateTask");
      socket.off("deleteTask");
    };
  }, []);

  const value = useMemo(
    () => ({
      useHandleCreateTask,
      projectInfo,
      allTasks,
      allFeatureTasks,
      formLoading,
    }),
    [projectInfo, allTasks, allFeatureTasks, formLoading]
  );
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
