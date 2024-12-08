"use client";
import { Button, Modal, ScrollArea, Text, Transition } from "@mantine/core";
import React, { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import CreateProjectForm from "../Forms/createProjectForm";
import ProjectProvider from "../Contexts/ProjectContext";
import AllProjectsSection from "./AllProjectsSection";
import { IconPlus } from "@tabler/icons-react";

const ProjectsComponent = ({
  opened,
  setOpened,
  user,
}: {
  opened: boolean;
  setOpened: Function;
  user: any;
}) => {
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);

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
            <Modal
              opened={modalOpened}
              onClose={closeModal}
              title={
                <Text className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Create New Project
                </Text>
              }
              size="lg"
              radius="md"
              padding="xl"
              withCloseButton={false}
              overlayProps={{
                backgroundOpacity: 0.2,
                blur: 6,
              }}
              className="shadow-xl"
            >
              <CreateProjectForm close={closeModal} userId={user._id} />
            </Modal>

            <div className="flex justify-between items-center w-full p-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                My Projects
              </h1>
              <Button
                size="md"
                onClick={open}
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
                leftSection={<IconPlus size={18} />}
              >
                Create New Project
              </Button>
            </div>
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
