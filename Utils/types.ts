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
    // meetings: String,
    // messages : String,
    activity? : Number

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