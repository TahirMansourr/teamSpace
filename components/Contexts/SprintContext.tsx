"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useBackLogContext } from "./BackLogContext";
import { BackLogDto, SprintDto, UserDto } from "@/Utils/types";
import { CreateSprint } from "@/lib/actions/SprintActions";
import { useWorkSpaceContext } from "./WorkSpaceContext";
import { notifications } from "@mantine/notifications";

type SprintsByStatus = {
  active: SprintDto[];
  completed: SprintDto[];
  cancelled: SprintDto[];
  planned: SprintDto[];
};
type AllSprints = {
  active: SprintDto[];
  completed: SprintDto[];
  cancelled: SprintDto[];
  planned: SprintDto[];
};

type SprintContextDTO = {
  selectedBackLog: BackLogDto | null;
  setSelectedBackLog: Dispatch<SetStateAction<BackLogDto | null>>;
  myBackLogs: BackLogDto[] | null;
  handleCreateSprint: (sprint: CreateOrUpdateSprint) => void;
  loading: boolean;
  sprintsByStatus:
    | { name: string; _id: string; sprints: SprintsByStatus }[]
    | null;
  allSprints: AllSprints | null;
  selectedSprint: SprintDto | null;
  isTransitioning: boolean;
  handleSprintClick: (sprint: SprintDto) => void;
  handleBack: () => void;
  showSprintsOnBackLogPage: boolean;
  setShowSprintsOnBackLogPage: Dispatch<SetStateAction<boolean>>;
};

type CreateOrUpdateSprint = {
  _id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  status: "planned" | "active" | "completed" | "cancelled";
  backlog: string;
  createdBy?: string;
  backlogItems?: string[];
  assignees?: string[];
};

const SprintContext = createContext<SprintContextDTO>({} as SprintContextDTO);

export const useSprintContext = () => {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error(
      "Error in useSprintContext: Make sure to wrap the consumer component with <SprintProvider>"
    );
  }
  return context;
};

const SprintProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedBackLog, setSelectedBackLog, myBackLogs } =
    useBackLogContext();
  const { userInfo, projectInfo } = useWorkSpaceContext();
  const [loading, setLoading] = useState(false);
  const [sprintsByStatus, setSprintsByStatus] = useState<
    { name: string; _id: string; sprints: SprintsByStatus }[] | null
  >([]);
  const [allSprints, setAllSprints] = useState<AllSprints>({
    active: [],
    completed: [],
    cancelled: [],
    planned: [],
  });

  // function GetActiveSprintsFromBacklogss() {
  //   let activeSprint: { name: string; sprints: SprintDto[] }[] = [];

  //   myBackLogs?.forEach((item: BackLogDto) => {
  //     let currentActiveSprint: { name: string; sprints: SprintDto[] } = {
  //       name: item.name,
  //       sprints: [],
  //     };
  //     item.sprints?.forEach((sprint) => {
  //       if (sprint.status === "active") {
  //         currentActiveSprint.sprints.push(sprint);
  //       }
  //     });
  //     if (currentActiveSprint.sprints.length > 0) {
  //       activeSprint.push(currentActiveSprint);
  //     }
  //   });
  //   return activeSprint;
  // } here using for each instead of map it better because map creates a new array and foreach performs operation on the same array

  useEffect(() => {
    setLoading(true);
    if (myBackLogs) {
      try {
        const result = GetSprintsByStatus();
        const allSprints = getAllSprintsByStatus();
        setSprintsByStatus(result);
        setAllSprints(allSprints);
        if (selectedBackLog) {
          if (sprintsByStatus) {
            const requiredBacklogSprint = sprintsByStatus.find(
              (sprint) => sprint._id === selectedBackLog._id
            );

            requiredBacklogSprint?.sprints &&
              setAllSprints(requiredBacklogSprint?.sprints);
          }
        }
      } catch (error) {
        const errorMessage = `error fetching sprints: ${error}`;
        notifications.show({
          message: errorMessage,
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [myBackLogs, selectedBackLog]);

  const [selectedSprint, setSelectedSprint] = useState<SprintDto | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showSprintsOnBackLogPage , setShowSprintsOnBackLogPage] = useState<boolean>(false);

  const handleSprintClick = (sprint: SprintDto) => {
    setIsTransitioning(true);
    setSelectedSprint(sprint);
    setTimeout(() => {
      setSelectedSprint(sprint);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSprint(null);
      setIsTransitioning(false);
    }, 300);
  };

  const getAllSprintsByStatus = useCallback(() => {
    const allSprintsByStatus: AllSprints = {
      active: [],
      completed: [],
      cancelled: [],
      planned: [],
    };

    myBackLogs?.forEach((backlog) => {
      backlog.sprints?.forEach((sprint) => {
        allSprintsByStatus[sprint.status].push(sprint);
      });
    });

    return allSprintsByStatus;
  }, [myBackLogs]);

  const GetSprintsByStatus = useCallback(() => {
    return (
      myBackLogs?.reduce((acc, backlog) => {
        const sprintsByStatus = backlog.sprints?.reduce(
          (statusAcc, sprint) => {
            statusAcc[sprint.status].push(sprint);
            return statusAcc;
          },
          {
            active: [],
            completed: [],
            cancelled: [],
            planned: [],
          } as SprintsByStatus
        ) || {
          active: [],
          completed: [],
          cancelled: [],
          planned: [],
        };

        acc.push({
          name: backlog.name,
          _id: backlog._id,
          sprints: sprintsByStatus,
        });

        return acc;
      }, [] as { name: string; _id: string; sprints: SprintsByStatus }[]) || []
    );
  }, [myBackLogs]);

  const handleCreateSprint = useCallback(
    async (sprint: CreateOrUpdateSprint) => {
      if (!selectedBackLog) {
        notifications.show({
          title: "Error",
          message: "Please select a backlog to create a sprint",
          color: "red",
        });
        return;
      }
      const selectedBackLogItemsIds = selectedBackLog?.backlogItems?.map(
        (item) => item._id
      );
      const selectedBackLogItems = selectedBackLog.backlogItems?.filter(
        (item) => selectedBackLogItemsIds?.includes(item._id)
      );
      const assignedMembers = projectInfo?.project.team.filter(
        (member: UserDto) => sprint.assignees?.includes(member._id)
      );
      const newSprint = {
        ...sprint,
        backlog: selectedBackLog ? selectedBackLog._id : "",
        createdBy: userInfo?._id,
        backlogItems: selectedBackLogItemsIds,
      };
      try {
        setLoading(true);
        const response = await CreateSprint(newSprint);
        if (response.success && selectedBackLog) {
          setSelectedBackLog({
            ...selectedBackLog,
            sprints: [
              ...(selectedBackLog?.sprints || []),
              {
                ...newSprint,
                _id: response.data._id,
                createdBy: userInfo,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                backlogItems: selectedBackLogItems,
                assignees: assignedMembers,
              },
            ],
          });
        }
      } catch (error: any) {
        console.error("Failed to create sprint", error);
        throw new Error("Failed to create sprint");
      } finally {
        setLoading(false);
      }
    },
    [selectedBackLog, userInfo, setSelectedBackLog]
  );

  const value = useMemo(
    () => ({
      selectedBackLog,
      setSelectedBackLog,
      myBackLogs,
      handleCreateSprint,
      loading,
      sprintsByStatus,
      allSprints,
      selectedSprint,
      isTransitioning,
      handleSprintClick,
      handleBack,
      showSprintsOnBackLogPage,
      setShowSprintsOnBackLogPage
    }),
    [
      selectedBackLog,
      myBackLogs,
      handleCreateSprint,
      loading,
      sprintsByStatus,
      allSprints,
      selectedSprint,
      isTransitioning,
      handleSprintClick,
      handleBack,
      showSprintsOnBackLogPage,
      setShowSprintsOnBackLogPage
    ]
  );

  return (
    <SprintContext.Provider value={value}>{children}</SprintContext.Provider>
  );
};

export default SprintProvider;
