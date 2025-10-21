"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import useLogin from "@/hooks/use-login";
import { PasswordInput } from "./password-input";
import Link from "next/link";

interface LoginFormProps {
  callbackUrl: string;
}

export function LoginForm({
  className,
  callbackUrl,
  ...props
}: React.ComponentProps<"div"> & LoginFormProps) {
  const { form, onSubmit } = useLogin(callbackUrl);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your {process.env.NEXT_PUBLIC_APP_NAME} account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="john@doe.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={
                    form.formState.isSubmitting &&
                    form.formState.isLoading &&
                    !form.formState.isValid
                  }
                  type="submit"
                  className="w-full"
                >
                  {form.formState.isSubmitting ? "Login..." : "Login"}
                </Button>
              </div>
            </form>

            <div className="mt-4 flex flex-row items-center justify-between gap-4">
              <Link href="#" className="text-sm">
                Forgot password?
              </Link>
              <Link href="#" className="text-sm ">
                Log in using SSO
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
