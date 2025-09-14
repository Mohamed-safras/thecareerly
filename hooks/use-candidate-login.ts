"use client";

import { useCallback, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(v: string): string | null {
  const value = v.trim();
  if (!value) return "Email is required.";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address.";
  return null;
}

function validatePassword(v: string): string | null {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export default function useCandidateLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const isValid = useMemo(() => {
    return !validateEmail(email) && !validatePassword(password);
  }, [email, password]);

  const candidateLoginHandler = useCallback(async () => {
    // clear global error each attempt

    // validate fields
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return; // stop if invalid

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl: "/connect/dashboard",
      });

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
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  // onChange helpers: clear field-specific errors as user edits
  const onEmailChange = useCallback(
    (v: string) => {
      setEmail(v);
      if (emailError) setEmailError(null);
    },
    [emailError]
  );

  const onPasswordChange = useCallback(
    (v: string) => {
      setPassword(v);
      if (passwordError) setPasswordError(null);
    },
    [passwordError]
  );

  // onBlur helpers: validate on blur for instant feedback
  const onEmailBlur = useCallback(
    () => setEmailError(validateEmail(email)),
    [email]
  );
  const onPasswordBlur = useCallback(
    () => setPasswordError(validatePassword(password)),
    [password]
  );

  return {
    // values
    email,
    password,
    loading,
    isValid,
    // errors
    emailError,
    passwordError,
    // setters
    setEmail: onEmailChange,
    setPassword: onPasswordChange,
    onEmailBlur,
    onPasswordBlur,
    // actions
    candidateLoginHandler,
  };
}
