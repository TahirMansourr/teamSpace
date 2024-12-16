import React from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import FirstBackLog from "./FirstBackLog";
import AllBackLogs from "./AllBackLogs";
import { Loader } from "@mantine/core";
import { SingleBackLogComponent } from "./SingleBackLogComponent";

const MainPage = () => {
  const { myBackLogs, backLogLoading, selectedBackLog } = useBackLogContext();
  if (backLogLoading) {
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <Loader type="bars" size="xl" />
      </div>
    );
  } else if (!backLogLoading && !myBackLogs && !selectedBackLog) {
    return <FirstBackLog />;
  } else if (!backLogLoading && myBackLogs && !selectedBackLog) {
    return <AllBackLogs backlogs={myBackLogs ?? []} />;
  } else if (selectedBackLog) {
    return <SingleBackLogComponent backlog={selectedBackLog} />;
  }
};

export default MainPage;
