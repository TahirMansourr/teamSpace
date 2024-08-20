"use client";

import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Avatar, Button, Checkbox, Group, Image, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UploadButton } from "@/Utils/uploadThing";
import { notifications } from "@mantine/notifications";



export default function SignUpPage(){
    const router = useRouter()
    const [loading , setLoading] = useState<boolean>(false)

    const onSignUp = async (values : {email : string , password : string , username : string , image : string}) => {
        setLoading(true)
        try {
             await axios.post('api/users/signUp' , values)
                    router.push('signIn')
               
            //  router.push('signIn')
        } catch (error : any) {
         if(error.response.data.error == 'Email already exists'){
          form.setFieldError('email', error.response.data.error)
        }else if(error.response.data.error =='Username already exists'){
          form.setFieldError('username', error.response.data.error)
        }else{
          alert(error.response.data.error)
        }
            
        }finally{
          setLoading(false)
        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email : '',
            password : '',
            username : '',
            image : ''
        },
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

    return(
        <div className=" flex justify-center items-center w-full h-screen">
            <form onSubmit={form.onSubmit((values) => onSignUp(values))}>
              {loading ? <LoadingOverlay visible/> : null}
                <div className=" flex flex-col min-w-96  border p-5 shadow-2xl rounded-lg">
                  <div  className="flex flex-col items-center justify-center">
                <Avatar 
                src={form.getValues().image.length > 0 ? form.getValues().image :"https://utfs.io/f/7561a7ed-2c05-45a2-83e6-edfae4b5e15d-yk6o7u.avif" }
                alt="it's me" 
                size={300}
                mb={8}
                className="!shadow-lg"
                {...form.getInputProps('image')}
                 />
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    form.setFieldValue('image', res[0].url);
                    console.log("Files: ", res);
                   notifications.show({message : 'successfully uploaded your image' , color : 'green'})
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                  </div>
                  
                    <TextInput
                      withAsterisk
                      label="Email"
                      placeholder="your@email.com"
                      key={form.key('email')}
                      {...form.getInputProps('email')}
                    />
                    <TextInput
                      withAsterisk
                      label="username"
                      placeholder="Some cool username"
                      key={form.key('username')}
                      {...form.getInputProps('username')}
                    />
                    <TextInput
                      withAsterisk
                      type="password"
                      label="password"
                      placeholder="Make sure to have a strong password"
                      key={form.key('password')}
                      {...form.getInputProps('password')}
                    />


                    <Group justify="flex-end" mt="md">
                      <Button type="submit">Submit</Button>
                    </Group>
              </div>
            </form>
        </div>
    )
} 