'use client'
import React, { useState } from 'react'

const useHandleSubmitForms = () => {

  const [formLoading , setFormLoading] = useState<boolean>(false)

  async function handleSubmitForm({values , close} : {values : any , close ?: () => void}){

  }
  return (
    <div>useHandleSubmitForms</div>
  )
}

export default useHandleSubmitForms