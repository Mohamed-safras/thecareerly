"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { LOGIN } from "@/constents/router-links";
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
import { FieldGroup } from "./ui/field";
import { cn } from "@/lib/utils";
import { ArrowRight, GalleryVerticalEnd } from "lucide-react";
import CarouselSlides, { CarouselSlide } from "./carousel-slides";

const carouselSlides: CarouselSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=896",
    caption: "Start building your dream team today",
  },
  {
    src: "https://images.unsplash.com/photo-1758691737060-3814f16d5aba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    caption: "Empower people, simplify HR management",
  },
  {
    src: "https://images.unsplash.com/photo-1759903553651-4bb47d08b24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    caption: "Where great organizations begin their journey",
  },
];

export function RegisterOrganization({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit } = useOrganizationSignUp();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-3 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (e) => {
                console.log("Validation errors:", e);
              })}
              className="p-6 md:p-8"
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">
                    Get Started with thecareerly
                  </h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Free 14 day trial. No credit card required.
                  </p>
                </div>
              </FieldGroup>

              <div className="grid gap-6 mt-6">
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
                  className="w-full bg-primary"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
              </div>

              <div className="text-center mt-6">
                <span>Have an organization account? </span>

                <Link
                  href={LOGIN}
                  className="text-primary underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
          {/* Left Column: Carousel */}
          <div className="bg-muted rounded-xl relative hidden md:block overflow-hidden">
            {/* Logo + App name */}
            <div className="absolute top-5 left-5 flex justify-center z-20">
              <Link
                href={"/"}
                target="_blank"
                className="flex items-center gap-2 font-medium"
              >
                <div className="bg-primary text-primary-foreground flex w-6 h-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="w-4 h-4" />
                </div>
                <p className="text-primary">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </p>
              </Link>
            </div>

            {/* Back to website */}
            <div
              className="absolute top-5 right-5 z-20 flex justify-center rounded-2xl px-2 cursor-pointer
                bg-white/5 backdrop-blur-md border border-white/45 shadow-sm"
            >
              <Link
                href={"/"}
                className="text-white text-sm font-normal flex items-center gap-1"
              >
                <span>Back to website</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sliding Carousel */}
            <CarouselSlides carouselSlides={carouselSlides} />
          </div>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
