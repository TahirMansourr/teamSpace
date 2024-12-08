import { useState, useEffect } from "react";
import { TextInput, Loader, Group, Badge } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

// import { debounce } from "lodash";

function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({ myProjects: [], otherProjects: [] });
  const [debouncedSearch] = useDebouncedValue(searchTerm, 300);

  //   const fetchProjects = debounce(async (query) => {
  //     if (!query) return;
  //     setIsLoading(true);

  //     try {
  //       const response = await fetch(`/api/search-projects?query=${query}`);
  //       const data = await response.json();
  //       // Assuming the API returns `myProjects` and `otherProjects`
  //       setResults(data);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, 300); // Debounce delay of 300ms

  //   useEffect(() => {
  //     fetchProjects(searchTerm);
  //     return () => fetchProjects.cancel(); // Cancel debounce on unmount
  //   }, [searchTerm]);

  return (
    <div>
      <TextInput
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        radius="md"
        size="md"
        rightSection={isLoading && <Loader size="xs" />}
      />
      {/* <SearchResults results={results} /> */}
    </div>
  );
}
