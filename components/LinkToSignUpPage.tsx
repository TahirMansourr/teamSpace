import Link from 'next/link'
import React from 'react'

const LinkToSignUpPage = () => {
  return (
    <Link href = {'/signUp'} className='text-blue-500 transition-all hover:cursor-pointer hover:scale-105 hover:translate-x-2 hover:shadow-md'>Create an account</Link>
  )
}

export default LinkToSignUpPage