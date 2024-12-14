import React from "react";
import ProductBackLogHeader from "./ProductBackLogHeader";
import ProductBackLogTable from "./ProductBackLogTable";
import { useBackLogContext } from "../Contexts/BackLogContext";
import FirstBackLog from "./FirstBackLog";

const MainPage = () => {
  const { myBackLogs, backLogLoading } = useBackLogContext();
  if (backLogLoading) {
    return <div>Loading...</div>;
  } else if (!myBackLogs) {
    return <FirstBackLog/>;
  } else {
    return (
      <section className="w-full h-screen flex flex-col bg-white dark:bg-gray-900  rounded-md gap-4">
        <ProductBackLogHeader />
        <ProductBackLogTable />
      </section>
    );
  }
};

export default MainPage;
