'use client'
import { UserDto } from '@/Utils/types'
import React, { useEffect, useState } from 'react'
import { GetUserInfo } from '../Utils'

const useGetUserInfo = () => {
    const [user , setUser] = useState<UserDto >()
    const [loading , setLoading] = useState<boolean>(true)
    const [userForContext , setUserForContext] = useState<UserDto>()

    useEffect(
        ()=>{
        const getUserInfoAndSetState = async() => {
            try {
                setLoading(true)
                const user = await GetUserInfo()
                setUser(user)
                setUserForContext(user.data)
            } catch (error) {
                console.error(`error at useGetUserInfo Hook : ${error}`)
            }
            finally{
                setLoading(false)
            }
        }
       getUserInfoAndSetState()
      },[])
  return {user , userForContext , loading}
}

export default useGetUserInfo