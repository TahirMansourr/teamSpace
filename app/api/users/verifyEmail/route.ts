import User from "@/lib/models/UserModel";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    try {
        connectToDB()
        const req = await request.json()
        const {token} = req

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined 
        await user.save()
    } catch (error : any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}