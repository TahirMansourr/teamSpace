'use client'
import DashBoardSideBar from "@/components/dashBoardSideBar"
import { useState } from "react"

type Props = {
    [key in 'meetings' | 'messages' | 'notifications' |'children' | 'projects']: React.ReactNode;
}

export default function DashboardLayout({
    children,
    messages,
    notifications,
    meetings,
    projects 
  }: Props) {

    const [pageToRender , setPageToRender] = useState<React.ReactNode>()

    return( 
    <main className="flex">  
        {/* <DashBoardSideBar /> */}
            {pageToRender}
    </main>)
  }