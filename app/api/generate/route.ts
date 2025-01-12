'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
    // Validate API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "GEMINI_API_KEY is not configured" },
            { status: 500 }
        );
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Retrieve the data we receive as part of the request body
        const data = await req.json()

        // Define a prompt varibale
        const prompt = data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response =  result.response;
        console.log("🚀 ~ file: route.ts:29 ~ response:", response)
        const output =  response.text();
        console.log("🚀 ~ file: route.ts:30 ~ output:", output)
        

        // Add error handling for the response
        if (!response || !output) {
            return NextResponse.json(
                { error: "Failed to generate content" },    
                { status: 500 }
            );
        }

        // Send the llm output as a server response object
        return NextResponse.json({ output })
    } catch (error : any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ 
        error: true,
        message: error.message || 'Failed to process request'
    }, { 
        status: 500 
    });
}
}