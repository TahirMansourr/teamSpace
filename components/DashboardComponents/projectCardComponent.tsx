"use client";
import { ProjectDto } from "@/Utils/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LoadingOverlay, Text } from "@mantine/core";
import Link from "next/link";
import { FiActivity, FiMoreVertical, FiTrash2, FiUsers } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { useProjectContext } from "../Contexts/ProjectContext";

const ProjectCardComponent = ({
  project,
  id,
}: {
  project: ProjectDto;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { deleteProject, loading } = useProjectContext();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 relative" // Added relative positioning
    >
      <LoadingOverlay visible={loading} />
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => deleteProject(project._id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 className="text-red-400 hover:text-red-600" />
          </button>
          <button
            {...attributes}
            {...listeners}
            className=" p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-grab z-10" // Positioned absolutely
          >
            <MdDragIndicator className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-gray-100 flex items-center justify-center mb-4">
            <Text size="xl" fw={700} className="text-blue-600">
              {project.name.charAt(0).toUpperCase()}
            </Text>
          </div>
          <Text size="xl" fw={700} className="text-gray-800 mb-2">
            {project.name}
          </Text>
          <Text className="text-gray-600 line-clamp-2">{project.content}</Text>
        </div>
        <div className=" flex flex-col gap-2 justify-center ">
          <div className="flex items-center gap-2 text-gray-600">
            <FiUsers className="text-blue-500" size={20} />

            <Text size="sm">{project.team.length} Members</Text>
          </div>
          <div className="flex -space-x-1 overflow-hidden mt-1">
            {project.team.slice(0, 10).map((member, index) => (
              <img
                key={index}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={
                  member.image ||
                  `https://ui-avatars.com/api/?name=${member.username}&background=random&bold=true`
                }
                alt={member.username}
              />
            ))}
            {project.team.length > 10 && (
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs text-gray-500 ring-2 ring-white">
                +{project.team.length - 10}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <Link
          href={`project/${project._id}`}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex justify-between items-center"
        >
          View Project Details
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCardComponent;
