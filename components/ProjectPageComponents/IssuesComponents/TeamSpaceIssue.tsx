'use client'
import { useIssuesContext } from '@/components/Contexts/IssuesContext'
import { IssueDto } from '@/Utils/types'
import React from 'react'
import IssueCard from './IssuesCard'


const TeamSpaceIssue = () => {
    const {allIssues} = useIssuesContext()
  return (
  <main>
    {
        allIssues ? 
          allIssues.map((Issue : IssueDto) => (
              <IssueCard Issue={Issue}/>
          )) :
          <h1>No Issues </h1>
    }
  </main>
  )
}

export default TeamSpaceIssue