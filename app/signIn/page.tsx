"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import LinkToSignUpPage from "@/components/LinkToSignUpPage";
import { FiLock, FiMail } from "react-icons/fi";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSignIn = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await axios.post("api/users/signIn", values);
      router.push("/myDashboard");
      router.refresh();
    } catch (error: any) {
      if (error.response.data.error == "This email does not exist") {
        form.setFieldError("email", error.response.data.error);
      } else if (error.response.data.error == "Password is incorrect") {
        form.setFieldError("password", error.response.data.error);
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
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Dots background from landing page */}
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
            Welcome Back
          </h2>

          <form
            onSubmit={form.onSubmit((values) => onSignIn(values))}
            className="space-y-6"
          >
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

            <PasswordInput
              leftSection={<FiLock className="text-blue-600" />}
              withAsterisk
              type="password"
              label="Password"
              placeholder="Enter your password"
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="flex justify-end mt-4">
              <LinkToSignUpPage />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
