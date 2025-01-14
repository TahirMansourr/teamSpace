"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TransitionWrapper } from "../TransitionWrapper";
import BackLogProvider from "@/components/Contexts/BackLogContext";
import SprintProvider from "@/components/Contexts/SprintContext";
import MainPage from "@/components/ProposalComponents/MainPage";

const Proposal = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setOpened(true);
    return () => setOpened(false);
  });

  return (
    <TransitionWrapper opened={opened}>
      <section className=" w-full h-screen">
        <div className="  flex flex-col h-full w-full  gap-2 rounded-xl   items-center p-3">
          <section className="w-full h-full px-8">
            <BackLogProvider>
              <SprintProvider>
                <MainPage />
              </SprintProvider>
            </BackLogProvider>
          </section>
        </div>
      </section>
    </TransitionWrapper>
  );
};

export default Proposal;
