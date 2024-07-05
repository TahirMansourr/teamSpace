export type ProjectDto = {
    _id : string,
    name : string,
    creator : string,
    admins : UserDto[],
    team : UserDto[],
    notes? : string[],
    Tasks : TaskDto[],
    issues? : string[],
    chatSpace : MesssageDto[],
    likes?: number,
    content : string,
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
}
export type TaskDto = {
    name : string,
    description : string,
    priority : 'HIGH' | 'MEDIUM' | 'LOW',
    dueDate : Date,
    assignedTo : string[],
    tags : string[],
    status : 'To Do' | 'In Progress' | "Done" | 'Review'
    _id : string
}
export type MesssageDto= {

}