import { SignUpFormScheama } from "@/lib/form-validation/sign-up-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { axiosClient } from "@/lib/http/axios-client";
import {
  CONNECT_CANDIDATE_lOGIN,
  CONNECT_CANDIDATE_SIGNUP,
} from "@/constents/router-links";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof SignUpFormScheama>;

const useCandidateSignUp = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpFormScheama),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await axiosClient.post(
        `/api/auth${CONNECT_CANDIDATE_SIGNUP}`,
        values
      );
      console.log(response);

      if (response.status === 201 && response.statusText === "Created") {
        toast.success(
          `${response.data.message} please login into your account...`
        );
        router.replace(CONNECT_CANDIDATE_lOGIN);
      }
      // call your API here
    } catch (err) {
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return { form, onSubmit };
};

export default useCandidateSignUp;
