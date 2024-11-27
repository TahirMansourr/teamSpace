import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {

    try {
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY !)

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()

        // Define a prompt varibale
        const prompt = data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}