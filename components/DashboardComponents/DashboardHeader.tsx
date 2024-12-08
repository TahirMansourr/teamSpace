import { Button, Input } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import CreateProjectModal from "./createProjectModal";
import { useDisclosure } from "@mantine/hooks";

const DashboardHeader = ({ user }: { user: string }) => {
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !(searchRef.current as any).contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex justify-between items-center w-full p-4">
      <CreateProjectModal
        closeModal={closeModal}
        modalOpened={modalOpened}
        userId={user}
      />
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        My Projects
      </h1>
      <Input
        rightSection={<IconSearch size={18} />}
        radius="lg"
        className={`transition-all duration-300 ${
          isSearchOpen ? "opacity-100 scale-125" : "opacity-0 scale-0"
        }`}
      />

      <div className="flex items-center gap-4">
        {/* <div
          ref={searchRef}
          className={`transition-all duration-300  ${
            isSearchOpen ? "w-96" : "w-14"
          }`}
        >
          <div className="flex items-center">
            <IconSearch
              size={40}
              className={`hover:cursor-pointer transition-all duration-300 ${
                isSearchOpen
                  ? " text-gray-500"
                  : "text-blue-500 hover:text-blue-600"
              }`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className={`w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 ${
                isSearchOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
          </div>
        </div> */}
        <IconSearch
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="hover:cursor-pointer transition-all duration-300 text-blue-500 hover:text-blue-600"
        />

        <Button
          size="md"
          onClick={open}
          radius={"lg"}
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <IconPlus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
