"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoginFormScheama } from "@/validators/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginUser } from "@/store/slice/auth-slice";
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
      const result = await dispatch(
        loginUser({ email: values.email, password: values.password }),
      ).unwrap();

      console.log("Login result:", result);
      toast.success("Login successful!");
      router.replace("/");
    } catch (error) {
      toast.error((error as string) || "Login failed");
    }
  };

  return {
    form,
    onSubmit,
  };
}
