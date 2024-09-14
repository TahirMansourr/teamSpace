export type ProjectDto = {
    _id : string,
    name : string,
    creator : string,
    admins : UserDto[],
    team : UserDto[],
    notes : NotesDto[],
    Tasks : TaskDto[],
    issues : IssueDto[],
    chatSpace : MesssageDto[],
    likes?: number,
    content : string,
    docs : any[],
    files : FileDto[],
    folders : FolderDto[],
    // docs : String,
    // meetings: String,
    // messages : String,
    activity? : number

}
export type UserDto = {
    _id : string,
    username : string,
    email : string,
    password? : string,
    isVerified : boolean,
    isAdmin : boolean,
    projects : ProjectDto[],
    forgotPasswordToken?: string,
    forgotPasswordTokenExpiry?: Date,
    verifyToken?: string,
    verifyTokenExpiry?: Date,
    image : string,
}
export type TaskDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : UserDto[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id : string,
    creationDate : string,
    featureId? : string
}
export type IssueDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : UserDto[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id : string,
    creationDate : string
}
export type MesssageDto= {
    body : string,
    author : UserDto,
    createdAt : Date,
    project : string
}

export type NotesDto = {
    _id : string,
    body : string,
    creator : UserDto,
    project : ProjectDto,
    createdAt : Date,
    updatedAt : Date | null,
    comments : string[]
}

export type FeatureDto = {
    _id : string,
    name : string,
    description : string,
    docs? : any , 
    tasks : TaskDto[],
    issues : IssueDto[],
    notes : NotesDto[],
    projectId : string,
    createdAt : Date,
    updatedAt : Date | null,
    createdBy : UserDto,
}

export type Edits = {
    editedBy : UserDto,
    editedAt : Date,
    editedContent : string
}

export type FileDto = {
    _id : string,
    featureId? : string,
    name : string,
    body : string,
    createdAt : Date,
    project : ProjectDto,
    createdBy : UserDto,
    edits : Edits[],
    parent : FolderDto | null
   
}
export type FolderDto = {
    _id: string;
    featureId?: string;
    name: string;
    project: ProjectDto;
    children: (FileDto | FolderDto) []; // Children array can hold both files and folders
    createdAt: Date;
    createdBy: UserDto;
    edits: Edits[];
    parent: FolderDto | null;
}

export type ChildrenDto = {
    _id: string;
    name: string;
    childrenType: 'File' | 'Folder'; // Indicates if the child is a file or folder
    child: FileDto | FolderDto;       // The actual file or folder object
}
