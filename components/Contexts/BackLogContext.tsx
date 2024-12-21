"use client";

import { BackLogDto, BackLogItemDto, UserDto } from "@/Utils/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useGetMyProductBackLogs } from "../BackLogComponents/hooks";
import {
  CreateProductBackLog,
  RearrangeProductBackLogItem,
} from "@/lib/actions/ProductBackLogActions";
import { useWorkSpaceContext } from "./WorkSpaceContext";
import { notifications } from "@mantine/notifications";
import { CreateProductBackLogItem, UpdateProductBackLogItem, UpdateProductBackLogItemGroups, CreateProductBackLogItemGroup } from "@/lib/actions/ProductBackLogItemActions";
import { get } from "http";

type createBackLogItem = {
  e: React.FormEvent;
  title: string;
  description: string;
  type: "Feature" | "Bug" | "Technical Debt" | "Improvement" | "Spike";
  estimatedEffort: number;
  acceptanceCriteria: string;
  priority: "Low" | "Medium" | "High";
  status: "To Do" | "In Progress" | "Done" | "Review";
  assignee: string[];
  close?: () => void;
};

type updateBackLogItem = createBackLogItem & {
  backlogItemId: string;
};

export type BackLogContextType = {
  myBackLogs: BackLogDto[] | null;
  backLogLoading: boolean;
  selectedBackLog: BackLogDto | null;
  setSelectedBackLog: Dispatch<SetStateAction<BackLogDto | null>>;
  handleCreateBackLog: (
    e: React.FormEvent,
    backlogName: string | undefined,
    description: string | undefined,
    close?: () => void
  ) => Promise<void>;
  loading: boolean;
  handleCreateBackLogItem: ({
    e,
    title,
    description,
    type,
    estimatedEffort,
    acceptanceCriteria,
    priority,
    status,
    assignee,
    close,
  }: createBackLogItem) => Promise<void>;
  handleUpdateBackLogItem: ({
    e,
    title,
    description,
    type,
    estimatedEffort,
    acceptanceCriteria,
    priority,
    status,
    assignee,
    close,
    backlogItemId,
  }: updateBackLogItem) => Promise<void>;
  rearrangeBacklogItems: (items: BackLogItemDto[]) => Promise<void>;
  updateGroups: (groups: { [key: string]: { name: string; items: string[] } }) => Promise<void>;
  createGroup: (groupName: string, items: string[]) => Promise<void>;
};

const BackLogContext = createContext<BackLogContextType>(
  {} as BackLogContextType
);

export const useBackLogContext = () => {
  if (BackLogContext === undefined) {
    throw new Error(
      `Error at BackLogContext, You probably forgot to wrap the consumer component with the Issues Context`
    );
  } else {
    return useContext(BackLogContext);
  }
};

const BackLogProvider = ({ children }: { children: React.ReactNode }) => {
  const { projectInfo } = useWorkSpaceContext();
  const team = projectInfo.project.team;
  const {
    myBackLogs,
    loading: backLogLoading,
    setMyBackLogs,
  } = useGetMyProductBackLogs({ projectId: projectInfo.project._id });
  const [selectedBackLog, setSelectedBackLog] = useState<BackLogDto | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const getSelectedTeamMembers = (
    team: UserDto[],
    assignee: string[]
  ): UserDto[] => {
    return team.filter((member) => assignee.includes(member._id));
  };

  const handleCreateBackLog = async (
    e: React.FormEvent,
    backlogName: string | undefined,
    description: string | undefined,
    close?: () => void
  ): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    try {
      const newBacklog = await CreateProductBackLog(
        projectInfo.project._id,
        backlogName,
        description
      );
      if (newBacklog) {
        setMyBackLogs((prevBackLogs) => [
          ...(prevBackLogs || []),
          newBacklog.backLog,
        ]);
      }
      notifications.show({ message: `${backlogName} created`, color: "green" });
    } catch (error) {
      console.error("Failed to create backlog:", error);
    } finally {
      setLoading(false);
      close ? close() : null;
    }
  };

  const handleCreateBackLogItem = async ({
    e,
    title,
    description,
    type,
    estimatedEffort,
    acceptanceCriteria,
    priority,
    status,
    assignee,
    close,
  }: createBackLogItem) => {
    setLoading(true);
    e.preventDefault();
    const selectedTeamMembers = getSelectedTeamMembers(team, assignee);
    try {
      const newBacklogItem = await CreateProductBackLogItem({
        backlogId: selectedBackLog?._id as string,
        title,
        description,
        type,
        estimatedEffort,
        acceptanceCriteria,
        priority,
        status,
        assignee,
      });
      console.log(
        "🚀 ~ file: BackLogContext.tsx:137 ~ newBacklogItem:",
        newBacklogItem
      );

      if (newBacklogItem) {
        setSelectedBackLog((prevBackLog) => {
          if (prevBackLog) {
            const updatedBackLog = {
              ...prevBackLog,
              backlogItems: [
                ...(prevBackLog.backlogItems || []),
                {
                  ...newBacklogItem.item,
                  assignee: selectedTeamMembers,
                },
              ],
            };
            return updatedBackLog;
          }
          return prevBackLog;
        });
      }
      notifications.show({ message: `${title} created`, color: "green" });
    } catch (error) {
      console.error("Failed to create backlogItem", error);
    } finally {
      setLoading(false);
      close ? close() : null;
    }
  };

  const handleUpdateBackLogItem = async ({
    e,
    title,
    description,
    type,
    estimatedEffort,
    acceptanceCriteria,
    priority,
    status,
    assignee,
    close,
    backlogItemId,
  }: updateBackLogItem) => {
    setLoading(true);
    e.preventDefault();
    const selectedTeamMembers = getSelectedTeamMembers(team, assignee);
    try {
      const updatedBacklogItem = await UpdateProductBackLogItem({
        itemId: backlogItemId,
        backlogId: selectedBackLog?._id as string,
        title,
        description,
        type,
        estimatedEffort,
        acceptanceCriteria,
        priority,
        status,
        assignee,
      });

      if (updatedBacklogItem) {
        setSelectedBackLog((prevBackLog) => {
          if (prevBackLog) {
            const updatedBackLog = {
              ...prevBackLog,
              backlogItems: prevBackLog.backlogItems?.map((item) =>
                item._id === backlogItemId
                  ? { ...updatedBacklogItem.item, assignee: selectedTeamMembers }
                  : item
              ),
            };
            return updatedBackLog;
          }
          return prevBackLog;
        });
      }
      notifications.show({ message: `${title} updated`, color: "green" });
    } catch (error) {
      console.error("Failed to update backlogItem", error);
    } finally {
      setLoading(false);
      close ? close() : null;
    }
  };

  const rearrangeBacklogItems = async (items: BackLogItemDto[]) => {
    try {
      setLoading(true);
      const requiredItems = items.map((item) => item._id);
      await RearrangeProductBackLogItem(
        selectedBackLog?._id as string,
        requiredItems
      );
    } catch (error) {
      throw new Error(`error at rearrangeBacklogItems ${error}`);
    } finally {
      setSelectedBackLog((prevBackLog) => {
        if (prevBackLog) {
          const updatedBackLog = {
            ...prevBackLog,
            backlogItems: items,
          };
          return updatedBackLog;
        }
        return prevBackLog;
      });
      setLoading(false);
    }
  };

  const updateGroups = async (groups: { [key: string]: { name: string; items: string[] } }) => {
    try {
      setLoading(true);
      await UpdateProductBackLogItemGroups({
        backlogId: selectedBackLog?._id as string,
        groups
      });
      
      // Update local state
      setSelectedBackLog((prevBackLog) => {
        if (!prevBackLog) return null;
        
        const updatedItems = prevBackLog.backlogItems?.map(item => {
          // Find if item belongs to any group
          const group = Object.entries(groups).find(([_, g]) => 
            g.items.includes(item._id)
          );
          
          if (group) {
            return {
              ...item,
              groupId: group[0],
              groupName: group[1].name
            };
          }
          
          return {
            ...item,
            groupId: null,
            groupName: null
          };
        });

        return {
          ...prevBackLog,
          backlogItems: updatedItems
        };
      });
    } catch (error) {
      console.error("Failed to update groups:", error);
      notifications.show({ 
        message: "Failed to update groups", 
        color: "red" 
      });
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (groupName: string, items: string[]) => {
    try {
      setLoading(true);
      const groupId = `group-${Date.now()}`;
      
      const result = await CreateProductBackLogItemGroup({
        backlogId: selectedBackLog?._id as string,
        groupId,
        name: groupName,
        items
      });

      if (result.success) {
        // Update local state
        setSelectedBackLog((prevBackLog) => {
          if (!prevBackLog) return null;
          
          const updatedItems = prevBackLog.backlogItems?.map(item => {
            if (items.includes(item._id)) {
              return {
                ...item,
                groupId,
                groupName
              };
            }
            return item;
          });

          return {
            ...prevBackLog,
            backlogItems: updatedItems
          };
        });

        notifications.show({ 
          message: `Group "${groupName}" created successfully`, 
          color: "green" 
        });
      }
    } catch (error) {
      console.error("Failed to create group:", error);
      notifications.show({ 
        message: "Failed to create group", 
        color: "red" 
      });
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      myBackLogs,
      backLogLoading,
      selectedBackLog,
      setSelectedBackLog,
      handleCreateBackLog,
      loading,
      handleCreateBackLogItem,
      handleUpdateBackLogItem,
      rearrangeBacklogItems,
      updateGroups,
      createGroup,
    }),
    [
      myBackLogs,
      backLogLoading,
      selectedBackLog,
      setSelectedBackLog,
      handleCreateBackLog,
      loading,
      handleCreateBackLogItem,
      handleUpdateBackLogItem,
      rearrangeBacklogItems,
      updateGroups,
      createGroup,
    ]
  );

  return (
    <BackLogContext.Provider value={value}>{children}</BackLogContext.Provider>
  );
};

export default BackLogProvider;
