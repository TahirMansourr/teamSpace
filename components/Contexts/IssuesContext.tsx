"use client";
import { IssueDto, ProjectDto, UserDto } from "@/Utils/types";
import { createContext, useContext, useEffect, useState } from "react";
import { createOrUpdateIssueForm } from "../Forms/createOrUpdateIssue";
import {
  CreateIssue,
  DeleteIssue,
  UpdateIssue,
} from "@/lib/actions/IssueActions";
 import { socket } from "@/socket";
// import { useChannel } from "ably/react";

type IssuesContextDto = {
  allIssues: IssueDto[];
  formLoading: boolean;
  handleCreateIssue: (
    values: createOrUpdateIssueForm,
    close: () => void
  ) => void;
  handleUpdateIssue: (
    values: createOrUpdateIssueForm,
    close: () => void
  ) => void;
  handleDeleteIssue: (
    issueId: string,
    close: () => void,
    closeMainModal: () => void
  ) => void;
  allFeatureIssues: IssueDto[];
};
const IssuesContext = createContext<IssuesContextDto>({} as IssuesContextDto);

export const useIssuesContext = () => {
  if (IssuesContext === undefined) {
    throw new Error(
      `Error at IssuesContext, You probably forgot to wrap the consumer component with the Issues Context`
    );
  } else {
    return useContext(IssuesContext);
  }
};

const IssuesProvider = ({
  children,
  project,
  user,
  featureIssues,
}: {
  children: React.ReactNode;
  project: ProjectDto;
  user: UserDto;
  featureIssues?: IssueDto[];
}) => {
  const [userInfo] = useState<UserDto>(user);
  const [issuesInfo, setIssuesInfo] = useState<IssueDto[]>(
    project.issues ? project.issues : []
  );
  const [allFeatureIssues, setAllFeatureIssues] = useState<IssueDto[]>(
    featureIssues ? featureIssues : []
  );
  //   console.log("🚀 ~ IssuesProvider ~ issuesInfo:", issuesInfo);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  // uncomment me to use Ably{
  // const { channel } = useChannel('get-started',()=>{} )

  // useEffect(()=>{
  //     channel.subscribe('create-issue' , (issue)=>{
  //         setIssuesInfo((prev : IssueDto[]) => [issue.data.newIssue , ...prev])
  //         if(issue.data.featureId){
  //             setAllFeatureIssues((prev : IssueDto[]) => [issue.data.newIssue , ...prev])
  //         }
  //     })
  //     channel.subscribe('update-issue', (issue) => {
  //         console.log('Received update-issue:', issue);

  //         if (issue?.data._id) {
  //             try {
  //                 setIssuesInfo(((prev : IssueDto[] )=> prev.map((prevIssue : IssueDto) => prevIssue._id === issue.data._id ? issue.data : prevIssue)))

  //                 setAllFeatureIssues(((prev : IssueDto[] )=> prev.map((prevIssue : IssueDto) => prevIssue._id === issue.data._id ? issue.data : prevIssue)))

  //             } catch (error) {
  //              console.error(error)
  //             }

  //         } else {
  //             console.error("Invalid issue data received:", issue);
  //         }
  //     });
  //   },[])}

  async function handleCreateIssue(
    values: createOrUpdateIssueForm,
    close: () => void
  ) {
    const assignedToMembers = values.assignedTo
      .map((id) => {
        const assignedToMember = project.team.find(
          (member: UserDto) => id === member._id
        );
        return assignedToMember;
      })
      .filter((id): id is UserDto => id !== undefined);

    try {
      setFormLoading(true);
      CreateIssue({
        assignedTo: values.assignedTo,
        description: values.description,
        dueDate: values.dueDate,
        name: values.name,
        priority: values.priority,
        projectId: project._id,
        status: values.status,
        tags: values.tags,
        userId: userInfo._id,
      }).then((res) => {
        const newIssue = {
          ...values,
          _id: res.issue._id,
          assignedTo: assignedToMembers as UserDto[],
          creationDate: res.issue.creationDate,
          createdBy: userInfo,
        };
        //uncomment me to use ably{
        // channel.publish('create-issue' ,{ newIssue ,  featureId : values.featureId});}
         socket.emit('createIssue' , newIssue)
      });
    } catch (error) {
      throw new Error(`error at handleCreateIssue : ${error}`);
    } finally {
      setFormLoading(false);
      close;
    }
  }
  async function handleUpdateIssue(
    values: createOrUpdateIssueForm,
    close: () => void
  ) {
    const assignedToMembers = values.assignedTo
      .map((name) => {
        const assignedToMember = project.team.find(
          (member: UserDto) => name === member.username
        );
        return assignedToMember;
      })
      .filter((id): id is UserDto => id !== undefined);

    try {
      setFormLoading(true);
      UpdateIssue({
        _id: values._id as string,
        assignedTo: assignedToMembers.map((member: UserDto | undefined) =>
          member ? member._id : ""
        ),
        description: values.description,
        dueDate: values.dueDate,
        name: values.name,
        priority: values.priority,
        projectId: project._id,
        status: values.status,
        tags: values.tags,
        userId: userInfo._id,
      }).then((res) => {
        const createdBy = project.team.find(
          (member: UserDto) => member._id === res.task.createdBy
        );
        const newIssue = {
          ...values,
          _id: values._id as string,
          assignedTo: assignedToMembers as UserDto[],
          creationDate: res.task.creationDate,
          lastModified: res.task.lastModified,
          createdBy,
        };
        //uncomment me to use ably{
        //  channel.publish('update-issue', newIssue);}
         socket.emit('updateIssue' , newIssue)
        // setIssuesInfo((prev: IssueDto[]) =>
        //   prev.map((prevIssue: IssueDto) =>
        //     prevIssue._id === newIssue._id ? newIssue : prevIssue
        //   )
        // );
        // setAllFeatureIssues((prev: IssueDto[]) =>
        //   prev.map((prevIssue: IssueDto) =>
        //     prevIssue._id === newIssue._id ? newIssue : prevIssue
        //   )
        // );
        // setIssuesInfo(((prev : IssueDto[] )=> prev.map((prevIssue : IssueDto) => prevIssue._id === newIssue._id ? newIssue : prevIssue)))
      });
    } catch (error) {
      throw new Error(`error at handleCreateIssue : ${error}`);
    } finally {
      setFormLoading(false);
      close;
    }
  }
  async function handleDeleteIssue(
    issueId: string,
    close: () => void,
    closeMainModal: () => void
  ) {
    try {
      setFormLoading(true);
      await DeleteIssue({
        issueId: issueId,
        projectId: project._id,
        userId: userInfo._id,
      });

      // Update both issue lists by filtering out the deleted issue
      setIssuesInfo((prev: IssueDto[]) =>
        prev.filter((issue) => issue._id !== issueId)
      );
      setAllFeatureIssues((prev: IssueDto[]) =>
        prev.filter((issue) => issue._id !== issueId)
      );

      // Uncomment for Ably
      // channel.publish('delete-issue', { issueId })

      // Uncomment for Socket.io
      // socket.emit('deleteIssue', issueId)
    } catch (error) {
      throw new Error(`error at handleDeleteIssue: ${error}`);
    } finally {
      setFormLoading(false);
      close;
    }
  }
  useEffect(()=>{
      socket.on('createIssue' ,(issue : IssueDto) => {
        console.log('🎁🎁🎁🎁🎁🎁🎁 i am here  ' , issue)
        setIssuesInfo((prev: IssueDto[]) => [issue, ...prev]);
        
      })
      socket.on('updateIssue' , (newIssue : IssueDto) => {
        setIssuesInfo((prev: IssueDto[]) =>
          prev.map((prevIssue: IssueDto) =>
            prevIssue._id === newIssue._id ? newIssue : prevIssue
          )
        );
        setAllFeatureIssues((prev: IssueDto[]) =>
          prev.map((prevIssue: IssueDto) =>
            prevIssue._id === newIssue._id ? newIssue : prevIssue
          )
        );

      })
      return () => {
        socket.off('createIssue');
        socket.off('updateIssue');
        socket.off('deleteIssue');
      };
  } , [])

  const value = {
    allIssues: issuesInfo,
    formLoading,
    handleCreateIssue,
    handleUpdateIssue,
    handleDeleteIssue,
    allFeatureIssues,
  };
  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};

export default IssuesProvider;
