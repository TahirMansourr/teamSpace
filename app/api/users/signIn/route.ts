import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/UserModel";

export async function POST(request : NextRequest ){
    try {
        connectToDB()
        const req = await request.json()
        const {email , password} = req

        const user = await User.findOne({email})
        console.log("🚀 ~ POST ~ user:", user)
        if(!user){
            return NextResponse.json({error : 'This user does not exist' , status : 400})
        }

        const validPassword = await bcryptjs.compare(password , user.password)
        if(!validPassword){
            return NextResponse.json({error : 'Password is incorrect' , status : 400})
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        console.log("🚀 ~ POST ~ tokenData:", tokenData)
        const token = await jwt.sign(tokenData , process.env.TokenSecret! , {expiresIn : '10d'})

        const response = NextResponse.json({ message : 'Login Successfull' , success : 'true'})
        response.cookies.set('token' , token , { httpOnly : true})
        return response
    } catch (error : any) {
        return NextResponse.json({error: error}, {status: 500})
    }
}