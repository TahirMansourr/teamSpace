import { NextRequest, NextResponse } from "next/server";

export default function middleware( request : NextRequest){
    const path = request.nextUrl.pathname
    console.log("🚀 ~ middleware ~ path:", path)
    const isPublicPath = path === '/signIn' || path === '/signUp' || path === '/verifyEmail'
    const token = request.cookies.get('token')?.value 

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/' , request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect( new URL('/signIn' , request.nextUrl))
    }
    
}

export const config = {
    matcher: [
      '/',
      '/dashboard',
      '/project/(.*)',
      '/signUp',
      '/signIn',
      '/verifyEmail'
    ]
  }