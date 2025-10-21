"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { CONNECT_ORGANIZATION_LOGIN } from "@/constents/router-links";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/password-input";
import useOrganizationSignUp from "@/hooks/use-organization-signup";

export function CreateOrg({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit } = useOrganizationSignUp();
  return (
    <Card {...props} className={className}>
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="text-2xl font-bold">Create Organization</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-muted-foreground text-balance">
            Set up your organization to start hiring talent
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem className="grid gap-1.5">
                  <FormLabel htmlFor="organizationName">
                    Organization Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="organizationName"
                      placeholder="thecareerly"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationEmail"
              render={({ field }) => (
                <FormItem className="grid gap-1.5">
                  <FormLabel htmlFor="organizationEmail">
                    Organization Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="organizationEmail"
                      placeholder="thecareerly@company.com"
                      type="email"
                      autoComplete="email"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-1.5">
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="confirmPassword"
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
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Creating Organization..."
                : "Create Organization"}
            </Button>

            <div className="text-center text-sm">
              Already have an organization?{" "}
              <Link
                href={CONNECT_ORGANIZATION_LOGIN}
                className="underline underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By creating an organization, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </Card>
  );
}
