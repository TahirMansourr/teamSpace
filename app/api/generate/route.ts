'use server'
import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 400 });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const data = await req.json();
        
        // Add timeout promise
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timed out')), 30000)
        );

        // Race between API call and timeout
        const result = await Promise.race([
            model.generateContent(data.body),
            timeoutPromise
        ]) as GenerateContentResult;

        const response = result.response;
        const output = response.text();

        return NextResponse.json({ output }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ 
            error: true,
            message: error.message || 'Request failed'
        }, { 
            status: error.message === 'Request timed out' ? 504 : 500 
        });
    }
}