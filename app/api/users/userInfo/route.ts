import Project from "@/lib/models/ProjectModel";
import User from "@/lib/models/UserModel";
import { connectToDB } from "@/lib/mongoose";
import { GetDataFromToken } from "@/Utils/authenticationUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    console.log('i have reached here');
    
    const userInfo = await GetDataFromToken(request);
    const toString = JSON.stringify(userInfo);
    const toObj = JSON.parse(toString);
    const id = toObj.id;

    const user = await User.findOne({ _id: id })
      .select("-password")
      .populate({
        path: "projects",
        model: Project,
        populate: [
          {
            path: "team",
            model: User,
            select: "-password"
          }
        ]
      });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("🚀 ~ GET ~ user: User is returned successfully");
    const returnedUser = user.toObject();
    console.log("🚀 ~ GET ~ returnedUser:User is successfully returned and is now an object");

    return NextResponse.json( returnedUser );
  } catch (error: any) {
    console.error("Error in GET /api/users/userInfo:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
