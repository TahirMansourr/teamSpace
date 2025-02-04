import { Transition } from "@mantine/core";
import { ReactNode } from "react";
import BackLogProvider from "../Contexts/BackLogContext";
import SprintProvider from "../Contexts/SprintContext";

export const TransitionWrapper = ({
  children,
  opened,
}: {
  children: ReactNode;
  opened: boolean;
}) => {
  return (
    <Transition
      mounted={opened}
      transition="fade-left"
      duration={600}
      timingFunction="ease"
    >
      {(styles) => (
        <BackLogProvider>
          <SprintProvider>
            <section className="flex w-full h-full" style={styles}>
              {children}
            </section>
          </SprintProvider>
        </BackLogProvider>
      )}
    </Transition>
  );
};
