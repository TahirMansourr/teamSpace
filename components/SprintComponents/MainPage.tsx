import MainPageHeader from "./MainPageHeader";
import MainPageBody from "./MainPageBody";
import { ScrollArea } from "@mantine/core";

const MainPage = () => {
  return (
    <div className="flex flex-col w-full mx-auto p-6">
      <MainPageHeader />
      <ScrollArea w={"100%"}>
        <MainPageBody />
      </ScrollArea>
    </div>
  );
};
export default MainPage;
