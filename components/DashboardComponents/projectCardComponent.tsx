import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Text } from "@mantine/core";
import Link from "next/link";
import { FiActivity, FiMoreVertical, FiUsers } from "react-icons/fi";

const ProjectCardComponent = ({ project, id }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col h-full"
    >
      <div className="flex justify-end p-2">
        <button
          {...attributes}
          {...listeners}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-move"
        >
          <FiMoreVertical className="text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col h-full">
        <div className="p-6 flex-grow">
          <div className="mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-gray-100 flex items-center justify-center mb-4">
              <Text size="xl" fw={700} className="text-blue-600">
                {project.name.charAt(0).toUpperCase()}
              </Text>
            </div>
            <Text size="xl" fw={700} className="text-gray-800 mb-2">
              {project.name}
            </Text>
            <Text className="text-gray-600 line-clamp-2">
              {project.content}
            </Text>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <FiUsers className="text-blue-500" />
              <Text size="sm">12 Members</Text>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiActivity className="text-blue-500" />
              <Text size="sm">High Activity</Text>
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
    </div>
  );
};

export default ProjectCardComponent;
