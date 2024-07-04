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
    const tostr = JSON.stringify(userInfo);
    const toObj = JSON.parse(tostr);
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

    console.log("🚀 ~ GET ~ user:", user);
    const returnedUser = user.toObject();
    console.log("🚀 ~ GET ~ returnedUser:", returnedUser);

    return NextResponse.json({ data: returnedUser });
  } catch (error: any) {
    console.error("Error in GET /api/users/userInfo:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
