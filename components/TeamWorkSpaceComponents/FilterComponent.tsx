"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  Input,
  List,
  Text,
  Breadcrumbs,
  Anchor,
  Menu,
  Button,
} from "@mantine/core";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { BackLogDto, SprintDto } from "@/Utils/types";
import { useBackLogContext } from "../Contexts/BackLogContext";
import FullScreenLoading from "@/Utils/FullScreenLoading";
import { IconFilter } from "@tabler/icons-react";
import LoadingBar from "@/Utils/NextProgressBar";
import { useSprintContext } from "../Contexts/SprintContext";
import { GetSprintById } from "@/lib/actions/SprintActions";

const FilterComponent = () => {
  const { myBackLogs: backlogs, loading } = useBackLogContext();
  const { selectedSprint, setSelectedSprint } = useSprintContext();
  const [selectedBacklog, setSelectedBacklog] = useState<string | null>(null);
  const [sprintId, setSprintId] = useState<string | null>(null);

  const handleBacklogChange = (backlogId: string) => {
    setSelectedBacklog(backlogId);
    setSelectedSprint(null); // Reset selected sprint when backlog changes
    setSprintId(null);
  };

  const handleSprintChange = async (sprintId: string) => {
    setSprintId(sprintId);
    const requiredSprint = await GetSprintById(sprintId);
    setSelectedSprint(requiredSprint.data);
  };

  if (loading || !backlogs)
    return (
      <div>
        <LoadingBar />
      </div>
    );

  const selectedBacklogName = backlogs.find(
    (b) => b._id === selectedBacklog
  )?.name;
  const selectedSprintName = backlogs
    .find((b) => b._id === selectedBacklog)
    ?.sprints?.find((s) => s._id === sprintId)?.name;

  return (
    <div className=" flex">
      <div className=" flex items-center gap-2 ">
        <Menu>
          <Menu.Target>
            <Button variant="outline">
              <IconFilter size={20} className="text-blue" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Accordion>
              {backlogs.map((backlog) => (
                <Accordion.Item key={backlog._id} value={backlog._id}>
                  <Accordion.Control
                    onClick={() => handleBacklogChange(backlog._id)}
                  >
                    {backlog.name}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <List>
                      {backlog.sprints?.map((sprint: SprintDto) => (
                        <List.Item
                          key={sprint._id}
                          onClick={() => handleSprintChange(sprint._id!)}
                          className={`cursor-pointer ${
                            sprintId === sprint._id
                              ? "bg-blue-100"
                              : "hover:bg-gray-100"
                          } p-2 rounded`}
                        >
                          <Text>{sprint.name}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Menu.Dropdown>
        </Menu>
        <Breadcrumbs separator=">">
          <Anchor>{selectedBacklogName || "Select Backlog"}</Anchor>
          {selectedSprintName && <Anchor>{selectedSprintName}</Anchor>}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default FilterComponent;
