"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, LoadingOverlay, TextInput, Transition } from "@mantine/core";
import { useForm } from "@mantine/form";
import LinkToSignUpPage from "@/components/LinkToSignUpPage";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
  }, []);

  const onSignIn = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await axios.post("api/users/signIn", values);
      router.push("/myDashboard");
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
    <Transition
      mounted={opened}
      transition="skew-down"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <div className=" flex justify-center items-center w-full h-screen">
            <form onSubmit={form.onSubmit((values) => onSignIn(values))}>
              <div className=" flex flex-col min-w-96  border p-5 shadow-2xl rounded-lg bg-opacity-0 ">
                {loading ? (
                  <div>
                    Processing
                    <LoadingOverlay visible />
                  </div>
                ) : null}
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  withAsterisk
                  type="password"
                  label="password"
                  placeholder="Make sure to have a strong password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
                <div className=" flex flex-col justify-end mt-3 ">
                  <Button type="submit" disabled={loading}>
                    Login
                  </Button>
                  <div className="mt-2 flex justify-end">
                    <LinkToSignUpPage />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Transition>
  );
}
