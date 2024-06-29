import User from "@/lib/models/UserModel";
import { connectToDB } from "@/lib/mongoose";
import { GetDataFromToken } from "@/Utils/authenticationUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    try {
        connectToDB()
        const userInfo = await GetDataFromToken(request)
        const tostr = JSON.stringify(userInfo)
        const toObj = JSON.parse(tostr)
        const id = toObj.id
        const user = await User.findOne({_id : id}).select('-password')
        // console.log("🚀 ~ GET ~ user:", user)
        return  NextResponse.json({data : user})
    } catch (error : any) {
        throw new Error("here" , error);
        
    }
}