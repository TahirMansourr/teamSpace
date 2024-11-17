"use client";
import { IssueDto, UserDto } from "@/Utils/types";
import { Badge, Spoiler, Avatar } from "@mantine/core";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import CreateOrUpdateIssuesModal from "./CreateOrUpdateIssueModal";
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
      className={`w-[95%] rounded-xl p-4 transition-all duration-300 hover:shadow-lg mb-3
        ${
          Issue.priority === "HIGH"
            ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-red-200"
            : Issue.priority === "MEDIUM"
            ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-orange-200"
            : "bg-gradient-to-br from-slate-50 to-white shadow-md hover:shadow-slate-200 border border-slate-200"
        }`}
    >
      <h5 className="text-xl font-semibold mb-4">{Issue.name}</h5>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/10">
          <Avatar size="sm" radius="xl" src="https://github.com/tahir.png" />
          <div>
            <span className="text-sm font-medium">Issued by</span>
            <p className="text-sm font-semibold">Tahir</p>
          </div>
        </div>

        <div className="px-3 py-2 rounded-lg bg-black/10">
          <span className="text-sm font-medium">Deadline</span>
          <p className="text-sm font-semibold">{date.toLocaleString()}</p>
        </div>
      </div>

      <Spoiler
        maxHeight={40}
        showLabel="Show more"
        hideLabel="Hide"
        className="mt-4"
      >
        <div className="text-sm whitespace-pre-line">{Issue.description}</div>
      </Spoiler>

      <div className="mt-4">
        <p className="font-medium mb-2">Assigned To</p>
        <div className="flex flex-wrap gap-2">
          {Issue.assignedTo.map((user: UserDto) => (
            <div
              key={user._id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/10"
            >
              <Avatar
                size="sm"
                radius="xl"
                src={user.image || "https://github.com/user.png"}
              />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/20">
          {/* <div className="flex items-center gap-2"> */}
          <span className="text-xs opacity-75">{formattedCreationDate}</span>
          <Badge
            radius="sm"
            size="lg"
            className="shadow-sm backdrop-blur-sm"
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
            {Issue.status || "No status"}
          </Badge>
          {/* </div> */}
          <FiEdit
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={open}
            size={18}
          />
        </div>
      </div>

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
    </section>
  );
};

export default IssueCard;
