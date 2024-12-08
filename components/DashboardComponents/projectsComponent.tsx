"use client";
import { Button, Modal, ScrollArea, Text, Transition } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import CreateProjectForm from "../Forms/createProjectForm";
import ProjectProvider from "../Contexts/ProjectContext";
import AllProjectsSection from "./AllProjectsSection";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import CreateProjectModal from "./createProjectModal";
import DashboardHeader from "./DashboardHeader";

const ProjectsComponent = ({
  opened,
  setOpened,
  user,
}: {
  opened: boolean;
  setOpened: Function;
  user: any;
}) => {
  useEffect(() => {
    setOpened(true);
    return () => setOpened(false);
  });

  return (
    <Transition
      mounted={opened}
      transition="fade-up"
      duration={600}
      timingFunction="ease"
    >
      {(styles) => (
        <ProjectProvider user={user}>
          <section className="m-5 w-full flex flex-col gap-5" style={styles}>
            <DashboardHeader user={user._id} />
            <ScrollArea w={"100%"}>
              <AllProjectsSection />
            </ScrollArea>
          </section>
        </ProjectProvider>
      )}
    </Transition>
  );
};

export default ProjectsComponent;
