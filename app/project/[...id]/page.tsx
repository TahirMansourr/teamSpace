import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import MainPage from "@/components/ProjectPageComponents/mainPage";
import SideBar from "@/components/ProjectPageComponents/sideBar";

export default function WorkSpace() {
  return (
   <WorkSpaceProvider>
      <main className="flex w-full min-h-screen">
        <SideBar/>
        <MainPage/>
      </main>
   </WorkSpaceProvider>
  );
}
