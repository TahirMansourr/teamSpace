import React, { useState } from "react";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { BackLogDto } from "@/Utils/types";
import SingleBackLogCard from "./SingleBackLogCard";
import { useDisclosure } from "@mantine/hooks";
import CreateBackLogModal from "./createBackLogModal";

interface BacklogProps {
  backlogs: BackLogDto[];
}

const AllBackLogs: React.FC<BacklogProps> = ({ backlogs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-gray-900  rounded-md px-10">
      <CreateBackLogModal opened={opened} close={close} />
      <div className="flex justify-around items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-indigo-600">Product Backlogs</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IconSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search backlogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <IconFilter size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md" onClick={open}>
            Add a Backlog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {backlogs?.map((backlog) => (
          <SingleBackLogCard backlog={backlog} key={backlog._id} />
        ))}
      </div>
    </div>
  );
};

export default AllBackLogs;
