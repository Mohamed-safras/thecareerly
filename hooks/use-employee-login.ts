"use client";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { CONNECT_EMPLOYEE_DASHBOARD } from "@/constents/router-links";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoginFormScheama } from "@/lib/form-validation/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = z.infer<typeof LoginFormScheama>;

export default function useEmployeeLogin() {
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginFormScheama),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        userType: "Employee",
        redirect: false,
        callbackUrl: CONNECT_EMPLOYEE_DASHBOARD,
      });

      console.log(res);

      if (!res) {
        toast.error("Unexpected error. Please try again.");
        return;
      }
      if (res.error) {
        const errorMessage =
          res.error === "CredentialsSignin"
            ? "Invalid email or password."
            : res.error;
        // NextAuth returns "CredentialsSignin" for bad creds—show friendly text

        toast.error(errorMessage);
        return;
      }
      if (res.ok) {
        window.location.href = res.url ?? "/";
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    form,
    onSubmit,
  };
}
