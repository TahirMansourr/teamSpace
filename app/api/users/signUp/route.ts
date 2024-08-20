'use server'

import User from "@/lib/models/UserModel";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/Utils/mailing";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("🚀 ~ POST ~ reqBody:", reqBody)
    
    
    const { username, email, password , image } = reqBody;

    const userEmail = await User.findOne({ email });
    const userUsername = await User.findOne({ username });
    if (userEmail) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    if (userUsername) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      image,
      password: hashedPassword,
    });
    await newUser.save()
    // const savedUser = await newUser.save()

    // await SendEmail({email, emailType: "VERIFY",
    //     userId: savedUser._id})

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
