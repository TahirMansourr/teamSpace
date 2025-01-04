"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TransitionWrapper } from "../TransitionWrapper";
import MainPage from "@/components/SprintComponents/MainPage";

const Scrum = ({
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
            <MainPage />
          </section>
        </div>
      </section>
    </TransitionWrapper>
  );
};

export default Scrum;
