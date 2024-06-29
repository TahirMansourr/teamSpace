import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { json } from 'stream/consumers'


export const GetDataFromToken = async (request : NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value
        if(!token) throw new Error('Sorry but there is no Token')
        const decodedToken = jwt.verify(token , process.env.TokenSecret!)
        console.log("🚀 ~ GetDataFromToken ~ decodedToken:", decodedToken)
        return decodedToken
    } catch (error : any) {
        throw new Error(`error at authenticationUtils : ${error}`)
    }
}