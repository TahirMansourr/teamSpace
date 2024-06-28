"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';


export default function SignUpPage(){
    const router = useRouter()

    const onSignUp = async (values : any) => {
        try {
             await axios.post('api/users/signUp' , values)
            // router.push('login')
        } catch (error : any) {
            console.log('failed to signUp' , error.message);
            
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
        <div className=" flex justify-center items-center w-full h-screen">
    <form onSubmit={form.onSubmit((values) => onSignUp(values))}>
        <div className=" flex flex-col min-w-96  border p-5 shadow-2xl rounded-lg bg-opacity-0 ">
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