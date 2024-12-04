import { FindUsers } from "@/lib/actions/UserActions";
import { MultiSelect } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useCallback } from "react";

interface AddUsersProps {
  onChange?: (value: string[]) => void;
}

const AddUsers = ({ onChange }: AddUsersProps) => {
  const [users, setUsers] = React.useState<{ value: string; label: string }[]>(
    []
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);

  const handleSearch = useCallback(async () => {
    try {
      const result = await FindUsers(debouncedSearch);
      if (result.status === "success") {
        const formattedUsers = result.users.map(
          (user: { name: string; email: string; id: string }) => ({
            value: user.id,
            label: `${user.name} (${user.email})`,
          })
        );
        setUsers(formattedUsers);
      }
    } catch (error) {
      setUsers([]);
    }
  }, [debouncedSearch]);

  return (
    <MultiSelect
      onChange={onChange}
      label="Search Users"
      placeholder="Type to search users..."
      data={users}
      searchValue={searchQuery}
      onSearchChange={(e) => {
        setSearchQuery(e);
        handleSearch();
      }}
      searchable
      nothingFoundMessage={`No users found for "${debouncedSearch}"`}
    />
  );
};

export default AddUsers;
