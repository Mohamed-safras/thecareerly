"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { organizationSignUpSchema } from "@/lib/form-validation/sign-up-form-schema";
import { axiosClient } from "@/lib/http/axios-client";
import {
  CONNECT_ORGANIZATION_CREATE,
  CONNECT_ORGANIZATION_LOGIN,
} from "@/constents/router-links";
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
      phone: "+224567820123",
    },
    mode: "onTouched",
  });

  const onSubmit = async (formValues: FormValues) => {
    try {
      const response = await axiosClient.post(
        AUTH_SERVICE_ENDPOINTS.CREATE_ORGANIZATIONUSER,
        formValues
      );

      if (response.status === 201 && response.statusText === "Created") {
        toast.success(
          `${response.data.message} please login into your account...`
        );
        router.replace(CONNECT_ORGANIZATION_LOGIN);
      }
    } catch (error) {
      console.log("Error during organization sign-up:", error);
    }
  };
  return {
    form,
    onSubmit,
  };
}
