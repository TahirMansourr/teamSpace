'use client'

import { useState } from 'react';
import { TextInput, Button, Modal, Menu, ActionIcon, Group } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconClearAll } from '@tabler/icons-react';
import { useBackLogContext } from '@/components/Contexts/BackLogContext';

interface GroupActionsProps {
  backlogId: string;
  groupId: string;
  groupName: string;
}

export function GroupActions({ backlogId, groupId, groupName }: GroupActionsProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(groupName);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  
  const { handleRenameGroup, handleDeleteGroup, handleClearGroup } = useBackLogContext();

  const onRename = async () => {
    try {
      await handleRenameGroup(groupId, newName);
      setIsRenaming(false);
    } catch (error) {
      console.error('Failed to rename group:', error);
    }
  };

  const onDelete = async () => {
    try {
      await handleDeleteGroup(groupId);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  const onClear = async () => {
    try {
      await handleClearGroup(groupId);
      setShowClearDialog(false);
    } catch (error) {
      console.error('Failed to clear group:', error);
    }
  };

  return (
    <div className="inline-flex items-center">
      {isRenaming ? (
        <div className="flex gap-2">
          <TextInput
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-40"
            placeholder="New group name"
          />
          <Button size="sm" onClick={onRename}>Save</Button>
          <Button size="sm" variant="subtle" onClick={() => setIsRenaming(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Menu position="bottom-start" withArrow>
          <Menu.Target>
            <ActionIcon variant="subtle" size="sm">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={14} />}
              onClick={() => setIsRenaming(true)}
            >
              Rename
            </Menu.Item>
            <Menu.Item
              leftSection={<IconClearAll size={14} />}
              onClick={() => setShowClearDialog(true)}
            >
              Clear Items
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={14} />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Group
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        opened={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Delete Group"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this group? This action cannot be undone.</p>
          <Group justify="flex-end" gap="sm">
            <Button variant="subtle" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={onDelete}>
              Delete
            </Button>
          </Group>
        </div>
      </Modal>

      {/* Clear Items Confirmation Modal */}
      <Modal
        opened={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        title="Clear Group Items"
      >
        <div className="space-y-4">
          <p>Are you sure you want to remove all items from this group? The items will not be deleted.</p>
          <Group justify="flex-end" gap="sm">
            <Button variant="subtle" onClick={() => setShowClearDialog(false)}>
              Cancel
            </Button>
            <Button onClick={onClear}>
              Clear Items
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
}