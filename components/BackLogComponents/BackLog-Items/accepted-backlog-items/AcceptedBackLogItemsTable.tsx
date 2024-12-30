import { Table, ActionIcon, Group } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface BacklogItem {
  rank: number;
  title: string;
  description: string;
  type: string;
  priority: string;
  status: string;
  acceptanceCriteria: string;
}

const AcceptedBackLogItemsTable = () => {
  // Sample data - replace with your actual data source
  const backlogItems: BacklogItem[] = [
    {
      rank: 1,
      title: 'Sample Task',
      description: 'Sample Description',
      type: 'Feature',
      priority: 'High',
      status: 'Accepted',
      acceptanceCriteria: 'Must meet these requirements...',
    },
    // Add more items as needed
  ];

  const rows = backlogItems.map((item) => (
    <Table.Tr key={item.rank}>
      <Table.Td>{item.rank}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>{item.type}</Table.Td>
      <Table.Td>{item.priority}</Table.Td>
      <Table.Td>{item.status}</Table.Td>
      <Table.Td>{item.acceptanceCriteria}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue">
            <IconEdit size="1rem" />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Rank</Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Priority</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Acceptance Criteria</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default AcceptedBackLogItemsTable;
