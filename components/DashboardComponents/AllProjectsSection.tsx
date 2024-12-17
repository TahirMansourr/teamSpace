"use client";
import React from "react";
import { useProjectContext } from "../Contexts/ProjectContext";
import ProjectCardComponent from "./projectCardComponent";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const AllProjectsSection = () => {
  const { userProjects, rearrangeProjects } = useProjectContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = userProjects.findIndex(
        (project) => project._id === active.id
      );
      const newIndex = userProjects.findIndex(
        (project) => project._id === over.id
      );

      const newProjects = [...userProjects];
      const [movedProject] = newProjects.splice(oldIndex, 1);
      newProjects.splice(newIndex, 0, movedProject);
      rearrangeProjects(newProjects);
    }
  };

  return (
    <div className="p-6">
      {userProjects && userProjects.length < 1 ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Start Your Journey
            </h1>
            <p className="text-gray-600">
              Create your first project to get started
            </p>
          </div>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={userProjects.map((p) => p._id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project: any) => (
                <ProjectCardComponent
                  project={project}
                  key={project._id}
                  id={project._id}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default AllProjectsSection;
