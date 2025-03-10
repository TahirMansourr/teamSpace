"use client";
import { BackLogItemDto, IssueDto, NotesDto, TaskDto } from "@/Utils/types";
import { Avatar, ScrollArea, Tabs, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheckbox,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import CreateOrUpdateTaskModal from "../TeamWorkSpaceComponents/tasksComponents/CreateTaskModal";
import PreviewTaskModal from "../TeamWorkSpaceComponents/tasksComponents/PriviewTaskModal";
import { FaEdit } from "react-icons/fa";
import CreateOrUpdateIssuesModal from "../TeamWorkSpaceComponents/IssuesComponents/CreateOrUpdateIssueModal";
import PreviewIssueModal from "../TeamWorkSpaceComponents/IssuesComponents/PriviewIssuesModal";
import CreateOrUpdateNotesModal from "../TeamWorkSpaceComponents/NotesComponents/CreateOrUpdateNotesModal";

const RightSection = ({
  selectedBacklogItemForSingleSprint,
}: {
  selectedBacklogItemForSingleSprint: BackLogItemDto | null;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const [IssuesOpened, { open: openIssues, close: closeIssues }] =
    useDisclosure();
  const [notesOpened, { open: openNotes, close: closeNotes }] = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<TaskDto | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueDto | undefined>(
    undefined
  );
  const [selectedNote, setSelectedNote] = useState<NotesDto | undefined>(
    undefined
  );

  return (
    <ScrollArea className="w-1/4 bg-white h-[calc(100vh-6rem)] dark:bg-gray-800 rounded-xl shadow-sm m-1 hover:shadow-md p-6">
      {selectedBacklogItemForSingleSprint ? (
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <IconCheckbox size={20} className="text-indigo-500" />
            {selectedBacklogItemForSingleSprint.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {selectedBacklogItemForSingleSprint.description}
          </p>
          <div className="flex w-full items-center justify-center">
            <Tabs
              defaultValue="Tasks"
              variant="outline"
              radius="lg"
              mb={4}
              mx={"auto"}
            >
              <Tabs.List w={"100%"} color="blue">
                <Tabs.Tab value="Tasks" leftSection={<IconPhoto size={12} />}>
                  {selectedBacklogItemForSingleSprint.tasks?.length} Tasks
                </Tabs.Tab>
                <Tabs.Tab
                  value="Issues"
                  leftSection={<IconMessageCircle size={12} />}
                >
                  {selectedBacklogItemForSingleSprint.issues?.length} Issues
                </Tabs.Tab>
                <Tabs.Tab
                  value="Notes"
                  leftSection={<IconSettings size={12} />}
                >
                  {selectedBacklogItemForSingleSprint.notes?.length} Notes
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="Tasks" mt={8}>
                <div className="space-y-4">
                  {selectedBacklogItemForSingleSprint.tasks?.map(
                    (task: TaskDto) => (
                      <div
                        key={task._id}
                        className="border hover:shadow-md p-3 rounded-lg"
                      >
                        {selectedTask && (
                          <CreateOrUpdateTaskModal
                            backlogItemId={
                              selectedBacklogItemForSingleSprint._id
                            }
                            backlogtitle={
                              selectedBacklogItemForSingleSprint.title
                            }
                            initialValues={selectedTask}
                            closeModal={close}
                            modalOpened={opened}
                          />
                        )}
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {task.description}
                        </p>
                        <div className="flex w-full justify-end gap-2 items-center">
                          <PreviewTaskModal task={task} />
                          <FaEdit
                            onClick={() => {
                              setSelectedTask(task);
                              open();
                            }}
                            size={15}
                            color="blue"
                            className="hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="Issues" mt={8}>
                <div className="space-y-4">
                  {selectedBacklogItemForSingleSprint.issues?.map(
                    (issue: IssueDto) => (
                      <div
                        key={issue._id}
                        className="border hover:shadow-md p-3 rounded-lg"
                      >
                        {selectedTask && (
                          <CreateOrUpdateIssuesModal
                            backlogItemId={
                              selectedBacklogItemForSingleSprint._id
                            }
                            backlogtitle={
                              selectedBacklogItemForSingleSprint.title
                            }
                            initialValues={selectedIssue}
                            closeModal={closeIssues}
                            modalOpened={IssuesOpened}
                          />
                        )}
                        <h4 className="font-medium">{issue.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {issue.description}
                        </p>
                        <div className="flex w-full justify-end gap-2 items-center">
                          <PreviewIssueModal issue={issue} />
                          <FaEdit
                            onClick={() => {
                              setSelectedIssue(issue);
                              openIssues();
                            }}
                            size={15}
                            color="blue"
                            className="hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="Notes" mb={8}>
                <div className="space-y-4">
                  {selectedBacklogItemForSingleSprint.notes?.map(
                    (note: NotesDto) => (
                      <div
                        key={note._id}
                        className="border hover:shadow-md p-3 rounded-lg"
                      >
                        {selectedNote && (
                          <CreateOrUpdateNotesModal
                            backlogItemId={
                              selectedBacklogItemForSingleSprint._id
                            }
                            backlogtitle={
                              selectedBacklogItemForSingleSprint.title
                            }
                            initialValues={selectedNote}
                            closeModal={closeNotes}
                            modalOpened={notesOpened}
                          />
                        )}

                        <div className="flex items-center gap-2 mb-2">
                          <Tooltip label={note.creator?.username || "Unknown"}>
                            <Avatar
                              src={note.creator?.image}
                              alt={note.creator?.username}
                              size="sm"
                              radius="xl"
                            />
                          </Tooltip>
                          <span className="text-sm text-gray-500">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{ __html: note.body }}
                          className="line-clamp-2 text-gray-600 dark:text-gray-300"
                        />

                        <div className="flex w-full justify-end gap-2 items-center mt-2">
                          <CreateOrUpdateNotesModal
                            initialValues={note}
                            closeModal={closeNotes}
                            modalOpened={notesOpened}
                          />
                          <FaEdit
                            onClick={() => {
                              setSelectedNote(note);
                              openNotes();
                            }}
                            size={15}
                            color="blue"
                            className="hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-300">
          Select a backlog item to view its tasks.
        </div>
      )}
    </ScrollArea>
  );
};
export default RightSection;
