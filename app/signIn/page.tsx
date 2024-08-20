"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Button, Checkbox, Group, LoadingOverlay, TextInput, Transition } from '@mantine/core';
import { useForm } from '@mantine/form';


export default function SignUpPage(){
    const router = useRouter()
    const [loading , setLoading] = useState<boolean>(false)
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        setOpened(true);
    }, []);

    const onSignUp = async (values : any) => {
        try {
             setLoading(true)
             await axios.post('api/users/signIn' , values)
             router.push('/')
        } catch (error : any) {
            console.log('failed to signUp' , error.message);
        }finally{
            setLoading(false)
        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email : '',
            password : '',
            username : ''
        },
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

    return(
      <Transition
      mounted={opened}
      transition="skew-down"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>
      <div className=" flex justify-center items-center w-full h-screen">
    <form onSubmit={form.onSubmit((values) => onSignUp(values))}>
        <div className=" flex flex-col min-w-96  border p-5 shadow-2xl rounded-lg bg-opacity-0 ">
            {loading? <div>Processing<LoadingOverlay visible/></div> : null}
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
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
        <Button type="submit" disabled = {loading}>Login</Button>
      </Group>
      </div>
    </form>
        </div>
        </div>}
    </Transition>
        
    )
} 