import React from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import FirstBackLog from "./FirstBackLog";
import AllBackLogs from "./AllBackLogs";
import { Loader } from "@mantine/core";
import { SingleBackLogComponent } from "./SingleBackLogComponent";
import FullScreenLoading from "@/Utils/FullScreenLoading";

const MainPage = () => {
  const { myBackLogs, backLogLoading, selectedBackLog } = useBackLogContext();
  if (backLogLoading) {
    return <FullScreenLoading />;
  } else if (!backLogLoading && !myBackLogs && !selectedBackLog) {
    return <FirstBackLog />;
  } else if (!backLogLoading && myBackLogs && !selectedBackLog) {
    return <AllBackLogs backlogs={myBackLogs ?? []} />;
  } else if (selectedBackLog) {
    return <SingleBackLogComponent />;
  }
};

export default MainPage;
