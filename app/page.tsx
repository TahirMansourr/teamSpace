import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      This should be the landing page
      <div>
      <Link href = {'/myDashboard'}> Go To My Dashboard</Link>
      </div>  
    </div>
  )
}

export default page