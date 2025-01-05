"use client";
import MainPageHeader from "./MainPageHeader";
import MainPageBody from "./MainPageBody";
import { useBackLogContext } from "../Contexts/BackLogContext";
import SprintProvider from "../Contexts/SprintContext";

const MainPage = () => {
  const { selectedBackLog, setSelectedBackLog } = useBackLogContext();
  return (
    <SprintProvider
      selectedBackLog={selectedBackLog}
      setSelectedBackLog={setSelectedBackLog}
    >
      <div className="container mx-auto p-6">
        <MainPageHeader />
        <MainPageBody />
      </div>
    </SprintProvider>
  );
};
export default MainPage;
