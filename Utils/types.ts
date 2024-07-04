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

}
export type MesssageDto= {

}