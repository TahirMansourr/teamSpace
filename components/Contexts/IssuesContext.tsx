"use client";
import { IssueDto, ProjectDto, UserDto } from "@/Utils/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createOrUpdateIssueForm } from "../Forms/createOrUpdateIssue";
import { socket } from "@/socket";
import { useIssuesActions } from "./context-hooks/IssueContextHooks";
import { useSprintContext } from "./SprintContext";

type IssuesContextDto = {
  allIssues: IssueDto[];
  formLoading: boolean;
  handleCreateIssue: (
    values: createOrUpdateIssueForm,
    close: () => void
  ) => void;
  handleUpdateIssue: (
    values: createOrUpdateIssueForm,
    close: () => void
  ) => void;
  handleDeleteIssue: (
    issueId: string,
    close: () => void,
    closeMainModal: () => void
  ) => void;
  allFeatureIssues: IssueDto[];
};
const IssuesContext = createContext<IssuesContextDto>({} as IssuesContextDto);

export const useIssuesContext = () => {
  if (IssuesContext === undefined) {
    throw new Error(
      `Error at IssuesContext, You probably forgot to wrap the consumer component with the Issues Context`
    );
  } else {
    return useContext(IssuesContext);
  }
};

const IssuesProvider = ({
  children,
  project,
  user,
  featureIssues,
}: {
  children: React.ReactNode;
  project: ProjectDto;
  user: UserDto;
  featureIssues?: IssueDto[];
}) => {
  const [userInfo] = useState<UserDto>(user);
  const [issuesInfo, setIssuesInfo] = useState<IssueDto[]>(
    project.issues ? project.issues : []
  );
  const [allFeatureIssues, setAllFeatureIssues] = useState<IssueDto[]>(
    featureIssues ? featureIssues : []
  );

  const {
    handleCreateIssue,
    handleUpdateIssue,
    handleDeleteIssue,
    formLoading,
  } = useIssuesActions({
    project,
    userInfo,
  });

  const { setSelectedBacklogItemForSingleSprint } = useSprintContext();

  useEffect(() => {
    socket.on("createIssue", (issue: IssueDto) => {
      console.log("🎁🎁🎁🎁🎁🎁🎁 i am here  ", issue);
      setIssuesInfo((prev: IssueDto[]) => [issue, ...prev]);
      setSelectedBacklogItemForSingleSprint((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          issues: prev.issues ? [...prev.issues, issue] : [issue],
        };
      });
    });
    socket.on("updateIssue", (newIssue: IssueDto) => {
      setIssuesInfo((prev: IssueDto[]) =>
        prev.map((prevIssue: IssueDto) =>
          prevIssue._id === newIssue._id ? newIssue : prevIssue
        )
      );
      setAllFeatureIssues((prev: IssueDto[]) =>
        prev.map((prevIssue: IssueDto) =>
          prevIssue._id === newIssue._id ? newIssue : prevIssue
        )
      );
      socket.on("deleteIssue", (issueId: string) => {
        setIssuesInfo((prev: IssueDto[]) =>
          prev.filter((issue) => issue._id !== issueId)
        );
        setAllFeatureIssues((prev: IssueDto[]) =>
          prev.filter((issue) => issue._id !== issueId)
        );
      });
    });
    return () => {
      socket.off("createIssue");
      socket.off("updateIssue");
      socket.off("deleteIssue");
    };
  }, []);

  const value = useMemo(
    () => ({
      allIssues: issuesInfo,
      formLoading,
      handleCreateIssue,
      handleUpdateIssue,
      handleDeleteIssue,
      allFeatureIssues,
    }),
    [
      issuesInfo,
      formLoading,
      handleCreateIssue,
      handleUpdateIssue,
      handleDeleteIssue,
      allFeatureIssues,
    ]
  );
  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};

export default IssuesProvider;
