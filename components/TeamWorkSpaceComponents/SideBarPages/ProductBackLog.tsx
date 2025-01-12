"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TransitionWrapper } from "../TransitionWrapper";
import MainPage from "@/components/BackLogComponents/MainPage";
import BackLogProvider from "@/components/Contexts/BackLogContext";
import SprintProvider from "@/components/Contexts/SprintContext";

const ProductBackLog = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setOpened(true);
    return () => setOpened(false);
  }, []);

  return (
    <TransitionWrapper opened={opened}>
      <BackLogProvider>
        <SprintProvider>
          <MainPage />
        </SprintProvider>
      </BackLogProvider>
    </TransitionWrapper>
  );
};

export default ProductBackLog;
