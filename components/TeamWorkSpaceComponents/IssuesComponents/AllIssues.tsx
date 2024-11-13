
import { useIssuesContext } from '@/components/Contexts/IssuesContext'
import React from 'react'
import IssuesComponent from './Issues'
import IssueCard from './IssuesCard'

const AllIssues = () => {
    const {allIssues} = useIssuesContext()
  return (
    <div>
        {
            <div className=' grid grid-cols-4 pt-10 gap-5'>
                { allIssues.length > 0 ? allIssues.map((issue)=> <IssueCard Issue={issue}/>) : <div>No issues found</div>}
            </div>
           
        }
        </div>
  )
}

export default AllIssues