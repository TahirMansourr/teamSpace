"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Avatar,
  Button,
  Checkbox,
  Group,
  Image,
  LoadingOverlay,
  TextInput,
  Transition,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UploadButton } from "@/Utils/uploadThing";
import { notifications } from "@mantine/notifications";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
  }, []);
  const onSignUp = async (values: {
    email: string;
    password: string;
    username: string;
    image: string;
  }) => {
    setLoading(true);
    try {
      await axios.post("api/users/signUp", values);
      router.push("signIn");

      //  router.push('signIn')
    } catch (error: any) {
      if (error.response.data.error == "Email already exists") {
        form.setFieldError("email", error.response.data.error);
      } else if (error.response.data.error == "Username already exists") {
        form.setFieldError("username", error.response.data.error);
      } else {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      username: "",
      image: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="dots-background" aria-hidden="true">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full h-screen">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 hover:shadow-3xl animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600">
            Create Account
          </h2>

          <form
            onSubmit={form.onSubmit((values) => onSignUp(values))}
            className="space-y-6"
          >
            <div className="flex flex-col items-center mb-6">
              <Avatar
                src={
                  form.values.image ||
                  "https://utfs.io/f/7561a7ed-2c05-45a2-83e6-edfae4b5e15d-yk6o7u.avif"
                }
                size={120}
                className="border-4 border-white shadow-lg mb-4"
              />
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  form.setFieldValue("image", res[0].url);
                  notifications.show({
                    message: "Profile picture uploaded successfully",
                    color: "green",
                  });
                }}
                onUploadError={(error: Error) => {
                  notifications.show({
                    message: `Upload failed: ${error.message}`,
                    color: "red",
                  });
                }}
              />
            </div>

            <TextInput
              leftSection={<FiMail className="text-blue-600" />}
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              className="transform transition-all duration-300 hover:scale-[1.01]"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: "#4F46E5",
                    boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.1)",
                  },
                },
              }}
              {...form.getInputProps("email")}
            />

            <TextInput
              leftSection={<FiUser className="text-blue-600" />}
              withAsterisk
              label="Username"
              placeholder="Choose a username"
              className="transform transition-all duration-300 hover:scale-[1.01]"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: "#4F46E5",
                    boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.1)",
                  },
                },
              }}
              {...form.getInputProps("username")}
            />

            <TextInput
              leftSection={<FiLock className="text-blue-600" />}
              withAsterisk
              type="password"
              label="Password"
              placeholder="Create a strong password"
              className="transform transition-all duration-300 hover:scale-[1.01]"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: "#4F46E5",
                    boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.1)",
                  },
                },
              }}
              {...form.getInputProps("password")}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:-translate-y-1"
              styles={{
                root: {
                  height: "48px",
                  fontSize: "16px",
                },
              }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
