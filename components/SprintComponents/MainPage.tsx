import MainPageHeader from "./MainPageHeader";
import MainPageBody from "./MainPageBody";
import { ScrollArea } from "@mantine/core";
import { useSprintContext } from "../Contexts/SprintContext";

const MainPage = () => {
  const { selectedSprint, loading } = useSprintContext();
  return (
    <div className="flex flex-col w-full mx-auto ">
      {!selectedSprint && !loading ? <MainPageHeader /> : null}
      <MainPageBody />
    </div>
  );
};
export default MainPage;
