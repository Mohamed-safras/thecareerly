"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { organizationSignUpSchema } from "@/lib/form-validation/sign-up-form-schema";
import { useAppDispatch } from "@/store/hooks";
import { registerOrganization } from "@/store/slice/auth-slice";

type FormValues = z.infer<typeof organizationSignUpSchema>;

export default function useOrganizationRegister() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>({
    resolver: zodResolver(organizationSignUpSchema),
    defaultValues: {
      organizationName: "",
      organizationEmail: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async ({
    organizationName,
    organizationEmail,
    password,
    confirmPassword,
  }: FormValues) => {
    console.log(
      "Submitting organization sign-up form with values:",
      organizationName,
      organizationEmail,
      password,
      confirmPassword
    );
    try {
      const result = await dispatch(
        registerOrganization({
          organizationName,
          organizationEmail,
          password,
          confirmPassword,
        })
      ).unwrap();

      console.log("Register result:", result);
      toast.success("organization register successful!");
      router.replace("/login");
    } catch (error) {
      // Axios error with response
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
      ) {
        toast.error(String(error.response.data.message));
        console.error("API error:", error.response.data);
      } else {
        toast.error(
          "Failed to create organization account. Please try again later."
        );
        console.error("Unknown error:", error);
      }
    }
  };

  return {
    form,
    onSubmit,
  };
}
