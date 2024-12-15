import React from "react";
import ProductBackLogHeader from "./ProductBackLogHeader";
import ProductBackLogTable from "./ProductBackLogTable";
import { useBackLogContext } from "../Contexts/BackLogContext";
import FirstBackLog from "./FirstBackLog";
import AllBackLogs from "./AllBackLogs";
import { Loader } from "@mantine/core";

const MainPage = () => {
  const { myBackLogs, backLogLoading } = useBackLogContext();
  if (backLogLoading) {
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <Loader type="bars" size="xl" />
      </div>
    );
  } else if (!backLogLoading && !myBackLogs) {
    return <FirstBackLog />;
  } else {
    return <AllBackLogs backlogs={myBackLogs ?? []} />;
  }
};

export default MainPage;
