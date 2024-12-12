import { NextRequest, NextResponse } from "next/server";

export default function middleware( request : NextRequest){
    const path = request.nextUrl.pathname
    console.log("🚀 ~ middleware ~ path:", path)
    const isPublicPath = path === '/signIn' || path === '/signUp' || path === '/verifyEmail' || path === '/api/users/signUp'
    const token = request.cookies.get('token')?.value 
    console.log("🚀 ~ middleware ~ token:", token?.slice(1,5))

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/myDashboard' , request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect( new URL('/signIn' , request.nextUrl))
    }
    
}

export const config = {
    matcher: [
      '/myDashboard',
      '/dashboard',
      '/project/(.*)',
      '/signUp',
      '/signIn',
    //   '/verifyEmail'
    ]
  }