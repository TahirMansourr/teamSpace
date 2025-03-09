import React from "react";
import { IssueDto } from "@/Utils/types";
import { Badge, Avatar, Tooltip } from "@mantine/core";
import {
  IconCalendar,
  IconUser,
  IconTag,
  IconFlag,
  IconCheck,
  IconClock,
  IconX,
  IconHistory,
} from "@tabler/icons-react";

const SingleIssuePreview = ({ issue }: { issue: IssueDto }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Done":
        return (
          <Badge color="green" leftSection={<IconCheck size={14} />}>
            Done
          </Badge>
        );
      case "In Progress":
        return (
          <Badge color="blue" leftSection={<IconClock size={14} />}>
            In Progress
          </Badge>
        );
      case "To Do":
        return (
          <Badge color="gray" leftSection={<IconX size={14} />}>
            To Do
          </Badge>
        );
      case "Review":
        return (
          <Badge color="yellow" leftSection={<IconFlag size={14} />}>
            Review
          </Badge>
        );
      default:
        return <Badge color="gray">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white p-6 mb-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {issue.name || "No Name"}
        </h3>
        {getStatusBadge(issue.status)}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {issue.description || "No Description"}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <IconCalendar size={20} className="text-red-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Due Date:{" "}
          {issue.dueDate
            ? new Date(issue.dueDate).toLocaleDateString()
            : "No Due Date"}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <IconFlag size={20} className="text-red-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Priority: {issue.priority || "No Priority"}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <IconUser size={20} className="text-red-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Assigned To:
        </span>
        <div className="flex -space-x-2">
          {issue.assignedTo?.length ? (
            issue.assignedTo.map((user) => (
              <Tooltip key={user._id} label={user.username}>
                <Avatar
                  src={user.image}
                  alt={user.username}
                  size={"md"}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                />
              </Tooltip>
            ))
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No Assignees
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <IconTag size={20} className="text-red-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Tags:</span>
        <div className="flex flex-wrap gap-2">
          {issue.tags?.length ? (
            issue.tags.map((tag, index) => (
              <Badge key={index} color="red" className="text-xs">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No Tags
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <IconUser size={20} className="text-red-500" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Created By:
        </span>
        {issue.createdBy ? (
          <Tooltip label={issue.createdBy.username}>
            <Avatar
              src={issue.createdBy.image}
              alt={issue.createdBy.username}
              size={"md"}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
            />
          </Tooltip>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Unknown
          </span>
        )}
      </div>
      {issue.lastModified && (
        <div className="flex items-center gap-2 mb-4">
          <IconHistory size={20} className="text-red-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last Modified: {new Date(issue.lastModified).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default SingleIssuePreview;
