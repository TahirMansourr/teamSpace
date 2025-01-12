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
}: Readonly<{
  setSelectedItemInSideBar: Dispatch<SetStateAction<string>>;
  SelectedItemInSideBar: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
  projectName: string;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const dataForSideBar = [
    "Product Backlogs",
    "Sprints",
    "TeamSpace",
    "Docs",
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
        c={"blue"}
        opened={opened}
        onClick={() => toggle()}
        aria-label="Toggle navigation"
        className={`${
          opened ? "mt-2" : "absolute m-2"
        } top-2 left-2 hover:cursor-pointer z-50`}
      />
      <section
        className={`transform transition-all duration-200 ease-in-out rounded-md  ${
          opened
            ? "w-64 min-h-screen border-r bg-white/95 backdrop-blur-sm"
            : "w-0 opacity-0"
        }`}
      >
        <div className="p-4 border-b shadow-sm">
          <UserButton />
          <h1 className="text-lg font-medium mt-2 text-blue-600 text-center">
            {projectName}
          </h1>
        </div>

        <nav className="py-4">
          <div className="space-y-1 px-3">
            {dataForSideBar.map((item: string, index: number) => (
              <button
                key={index + 1}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all
                  ${
                    SelectedItemInSideBar === item
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                onClick={() => {
                  setSelectedItemInSideBar(item);
                  setOpened(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <button
          className="flex items-center justify-center gap-2 px-4 py-2 mt-auto text-sm text-gray-600 hover:text-blue-600 border-t border-b shadow-sm  w-full"
          onClick={() => router.push("/myDashboard")}
        >
          <LuLayoutDashboard className="w-4 h-4 text-lg font-bold" size={40} />
          <span className="text-lg font-bold">Dashboard</span>
        </button>
      </section>
    </div>
  );
}

export default SideBar;
