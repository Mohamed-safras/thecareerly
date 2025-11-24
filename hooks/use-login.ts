"use client";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoginFormScheama } from "@/lib/form-validation/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { hydrateUserFromSession } from "@/store/slice/user-slice";
import { useAppDispatch } from "@/store/hooks";

type FormValues = z.infer<typeof LoginFormScheama>;

export default function useLogin() {
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginFormScheama),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log(res);

      if (!res) {
        throw new Error("No response from server. Please try again.");
      }
      if (res.error) {
        throw new Error(
          res.error === "CredentialsSignin"
            ? "Invalid email or password."
            : res.error
        );
      }
      if (!res.ok) {
        throw new Error("Login failed. Please try again.");
      }
      await dispatch(hydrateUserFromSession());
      router.replace("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return {
    form,
    onSubmit,
  };
}
