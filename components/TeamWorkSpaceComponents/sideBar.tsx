"use client";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import UserButton from "../user-button/UserButton";
import { useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";

function SideBar({
  setSelectedItemInSideBar,
  SelectedItemInSideBar,
  setOpened,
  projectName,
}: {
  setSelectedItemInSideBar: Dispatch<SetStateAction<string>>;
  SelectedItemInSideBar: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
  projectName: string;
}) {
  const [opened, { toggle }] = useDisclosure();
  const dataForSideBar = [
    "Docs",
    "TeamSpace",
    "NotesPage",
    "IssuesPage",
    "TasksPage",
    "Features",
    "Activity",
    "Settings",
  ];
  const router = useRouter();

  return (
    <div className="relative">
      <Burger
        size="sm"
        c={"green"}
        opened={opened}
        onClick={() => toggle()}
        aria-label="Toggle navigation"
        className={`${
          opened ? "mt-2" : "absolute m-2"
        } top-3 left-3 hover:cursor-pointer z-50`}
      />
      <section
        className={`transform transition-all duration-300 ease-in-out ${
          opened
            ? "max-w-[15rem] flex-grow min-h-[30rem] rounded-xl m-2 w-fit p-3 shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-sm"
            : "max-h-0 opacity-0 w-0 flex-grow-0 min-h-0"
        }`}
      >
        <div className="flex flex-col rounded-lg shadow-md border border-gray-100 p-3 bg-gradient-to-br from-gray-50 to-white">
          <UserButton />
          <h1 className="text-xl font-semibold text-center mt-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {projectName}
          </h1>
        </div>

        <section className="flex h-full w-full  text-xl mt-5 hover:cursor-pointer px-8 min-w-[11rem]">
          <div className="flex flex-col w-full space-y-2">
            {dataForSideBar.map((item: string, index: number) => (
              <p
                key={index}
                className={`px-2 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-blue-50 
                                    ${
                                      SelectedItemInSideBar === item
                                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-200 translate-x-1 scale-105"
                                        : "text-gray-700 hover:text-blue-600"
                                    }`}
                onClick={() => {
                  setSelectedItemInSideBar(item);
                  setOpened(false);
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <div
          className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200 hover:cursor-pointer transition-colors duration-200 text-gray-700 hover:text-blue-600"
          onClick={() => router.push("/myDashboard")}
        >
          <LuLayoutDashboard className="w-5 h-5" />
          <p className="font-semibold">Dashboard</p>
        </div>
      </section>
    </div>
  );
}

export default SideBar;
