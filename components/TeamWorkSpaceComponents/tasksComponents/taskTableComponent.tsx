"use client";
import React from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { ScrollArea, Table, Text } from "@mantine/core";
import { useTaskContext } from "@/components/Contexts/TasksContext";
import TaskTableBody from "./taskTableBody";

const TaskTableComponent = () => {
  const { allTasks } = useTaskContext();
  return (
    <section className="p-3 border rounded-md shadow-md m-3">
      {allTasks ? (
        <ScrollArea h={600}>
          <Table highlightOnHover stickyHeader stickyHeaderOffset={0}>
            <Table.Thead className="bg-gray-50">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <Text fw={600}>Name</Text>
                    <RiExpandUpDownLine className="text-gray-500" size={18} />
                  </div>
                </Table.Th>
                <Table.Th className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <Text fw={600}>Status</Text>
                    <RiExpandUpDownLine className="text-gray-500" size={18} />
                  </div>
                </Table.Th>
                <Table.Th className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <Text fw={600}>Priority</Text>
                    <RiExpandUpDownLine className="text-gray-500" size={18} />
                  </div>
                </Table.Th>
                <Table.Th className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <Text fw={600}>Due On</Text>
                    <RiExpandUpDownLine className="text-gray-500" size={18} />
                  </div>
                </Table.Th>
                <Table.Th className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <Text fw={600}>Category</Text>
                    <RiExpandUpDownLine className="text-gray-500" size={18} />
                  </div>
                </Table.Th>
                <Table.Th className="whitespace-nowrap py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <Text fw={600}>Assigned To</Text>
                    <RiExpandUpDownLine className="text-gray-500" size={18} />
                  </div>
                </Table.Th>
                <Table.Th className="w-20"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            {allTasks.map((task: any, index: number) => {
              const date = new Date(task.dueDate);
              return (
                <TaskTableBody
                  task={task}
                  date={date}
                  key={task._id}
                  index={index}
                />
              );
            })}
          </Table>
        </ScrollArea>
      ) : null}
    </section>
  );
};

export default TaskTableComponent;
