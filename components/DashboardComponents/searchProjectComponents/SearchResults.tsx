// import { ProjectDto } from "@/Utils/types";
// import { Badge, Group } from "@mantine/core";

// function SearchResults({ results } : {results : ProjectDto[]}) {

//   const renderProject = (project) => (
//     <Group key={project.id} position="apart" spacing="sm">
//       <div>
//         <strong>{project.name}</strong>
//         <div>{project.description}</div>
//       </div>
//       <Badge color={project.status === "active" ? "green" : "red"}>
//         {project.status}
//       </Badge>
//     </Group>
//   );

//   return (
//     <div>
//       <h4>My Projects</h4>
//       {myProjects.length > 0 ? (
//         myProjects.map(renderProject)
//       ) : (
//         <p>No projects found.</p>
//       )}

//       <h4>Other Projects</h4>
//       {otherProjects.length > 0 ? (
//         otherProjects.map(renderProject)
//       ) : (
//         <p>No projects found.</p>
//       )}
//     </div>
//   );
// }
