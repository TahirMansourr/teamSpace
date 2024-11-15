"use client";
import { IssueDto, TaskDto, UserDto } from "@/Utils/types";
import { Badge, Spoiler } from "@mantine/core";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import CreateOrUpdateIssuesModal from "./CreateOrUpdateIssueModal";
import Task from "@/lib/models/TasksModel";
import useGetUserInfo from "@/Utils/Hooks/GetUserInfo";

const IssueCard = ({ Issue }: { Issue: IssueDto }) => {
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);
  const date = new Date(Issue.dueDate);
  const creationDate = new Date(Issue.creationDate);
  const formattedCreationDate =
    creationDate.toLocaleDateString() + " " + creationDate.toLocaleTimeString();
  const { user } = useGetUserInfo();
  return (
    <section
      className={`flex flex-col w-[95%] shadow-md m-2 rounded-md p-2 border 
        ${
          Issue.priority === "HIGH"
            ? "bg-red-700 text-white"
            : Issue.priority === "MEDIUM"
            ? "bg-orange-500 text-white"
            : null
        }`}
    >
      <h5 className=" font-bold underline-offset-2 underline">{Issue.name}</h5>
      <p className="my-1">
        <Badge
          radius="md"
          size="sm"
          color={
            Issue.status === "To Do"
              ? "red"
              : Issue.status === "In Progress"
              ? "yellow"
              : Issue.status === "Done"
              ? "green"
              : Issue.status === "Review"
              ? "orange"
              : "gray"
          }
        >
          {Issue.status ? Issue.status : "no status yet"}
        </Badge>
      </p>
      <CreateOrUpdateIssuesModal
        modalOpened={modalOpened}
        closeModal={closeModal}
        initialValues={{
          ...Issue,
          createdBy: user,
          dueDate: date,
          assignedTo: Issue.assignedTo.map((user: any) => user.username),
        }}
      />
      <p className=" text-sm font-bold my-2">
        DeadLine: {date.toLocaleString()}
      </p>
      <Spoiler maxHeight={40} showLabel="..." hideLabel="Hide">
        <div className=" text-xs font-light whitespace-pre-line">
          {Issue.description}
        </div>
      </Spoiler>
      <div className="flex flex-col mt-2">
        <p className=" font-bold ">Assigned To</p>
        <div className=" flex gap-2">
          {Issue.assignedTo.map((user: UserDto) => (
            <Badge color="blue" key={user._id}>
              {user.username}
            </Badge>
          ))}
        </div>
        <FiEdit className=" ml-auto hover:cursor-pointer" onClick={open} />
      </div>
      <footer className="text-xs">{formattedCreationDate}</footer>
    </section>
  );
};

export default IssueCard;
