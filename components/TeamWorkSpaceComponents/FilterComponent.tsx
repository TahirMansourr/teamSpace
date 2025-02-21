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

const FilterComponent = () => {
  const { myBackLogs: backlogs, loading } = useBackLogContext();
  const [selectedBacklog, setSelectedBacklog] = useState<string | null>(null);
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);

  const handleBacklogChange = (backlogId: string) => {
    setSelectedBacklog(backlogId);
    setSelectedSprint(null); // Reset selected sprint when backlog changes
  };

  const handleSprintChange = (sprintId: string) => {
    setSelectedSprint(sprintId);
  };

  if (loading || !backlogs)
    return (
      <div>
        <FullScreenLoading />
      </div>
    );

  const selectedBacklogName = backlogs.find(
    (b) => b._id === selectedBacklog
  )?.name;
  const selectedSprintName = backlogs
    .find((b) => b._id === selectedBacklog)
    ?.sprints?.find((s) => s._id === selectedSprint)?.name;

  return (
    <div className="p-4 flex">
      <div className="mb-4 flex items-center gap-3">
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
                            selectedSprint === sprint._id
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
