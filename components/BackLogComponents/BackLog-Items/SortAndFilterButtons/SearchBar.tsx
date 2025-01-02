"use client";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedValue } from "@mantine/hooks";

const SearchBar = () => {
  const { filteredBacklogs, setFilteredBacklogs, selectedBackLog } =
    useBackLogContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearch) {
      const filtered = filteredBacklogs.filter(
        (item) =>
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setFilteredBacklogs(filtered);
    } else {
      setFilteredBacklogs(selectedBackLog?.backlogItems || []);
    }
  }, [debouncedSearch, setFilteredBacklogs]);

  return (
    <div className="relative w-full sm:w-64 lg:w-auto">
      <FiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search backlog items..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
