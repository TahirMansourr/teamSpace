"use client";

import { SprintDto } from "@/Utils/types";
import React, { useEffect, useState } from "react";
import { useSprintContext } from "../Contexts/SprintContext";
import { useBackLogContext } from "../Contexts/BackLogContext";
import FullScreenLoading from "@/Utils/FullScreenLoading";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";

interface SingleSprintPreviewProps {
  sprint: SprintDto;
}

const SingleSprintPreview: React.FC<SingleSprintPreviewProps> = ({
  sprint,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    handleBack,
    selectedBacklogItemForSingleSprint,
    setSelectedBacklogItemForSingleSprint,
    loading,
  } = useSprintContext();
  const { myBackLogs } = useBackLogContext();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex w-full ">
      {loading ? <FullScreenLoading /> : null}

      <LeftSection
        sprint={sprint}
        myBackLogs={myBackLogs}
        handleBack={handleBack}
      />

      <MiddleSection
        sprint={sprint}
        setSelectedBacklogItemForSingleSprint={
          setSelectedBacklogItemForSingleSprint
        }
      />

      <RightSection
        selectedBacklogItemForSingleSprint={selectedBacklogItemForSingleSprint}
      />
    </div>
  );
};

export default SingleSprintPreview;
