"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { organizationSignUpSchema } from "@/lib/form-validation/sign-up-form-schema";
import { axiosClient } from "@/lib/axios/axios-client";
import { LOGIN } from "@/constents/router-links";
import { AUTH_SERVICE_ENDPOINTS } from "@/constents/api-end-points";

type FormValues = z.infer<typeof organizationSignUpSchema>;

export default function useOrganizationSignUp() {
  const router = useRouter();
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

  const onSubmit = async (formValues: FormValues) => {
    console.log(
      "Submitting organization sign-up form with values:",
      formValues
    );
    try {
      const response = await axiosClient.post(
        AUTH_SERVICE_ENDPOINTS.CREATE_ORGANIZATION,
        formValues
      );

      if (response.status === 201 && response.statusText === "Created") {
        toast.success(
          `${response.data.message} please login into your account...`
        );
        router.replace(LOGIN);
      } else {
        toast.error("Unexpected response from server.");
        console.error("Unexpected response:", response);
      }
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
