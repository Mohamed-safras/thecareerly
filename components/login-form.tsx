"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { CONNECT_ORGANIZATION_NEW } from "@/constents/router-links";
import { FieldGroup } from "./ui/field";
import { ArrowRight, GalleryVerticalEnd } from "lucide-react";
import CarouselSlides, { CarouselSlide } from "./carousel-slides";

const carouselSlides: CarouselSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1758611972595-ac23d772446f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    caption: "Team collaboration in action",
  },
  {
    src: "https://images.unsplash.com/photo-1759903553692-8220b95cabbd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    caption: "Modern workspace environment",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=736",
    caption: "Brainstorming ideas together",
  },
];

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit } = useLogin();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-3 md:grid-cols-2">
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
                className="text-white text-sm font-medium flex items-center gap-1"
              >
                <span>Back to website</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sliding Carousel */}
            <CarouselSlides carouselSlides={carouselSlides} />
          </div>

          {/* Right Column: Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold uppercase">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your organization account
                  </p>
                </div>
              </FieldGroup>

              <div className="grid gap-6 mt-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="john@thecareerly.com"
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
                          placeholder="********"
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
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </div>

              <div className="mt-6 flex flex-row items-center justify-between gap-4">
                <Link href="#" className="text-primary text-sm">
                  Forgot password?
                </Link>
                <Link href="#" className="text-sm text-primary">
                  Log in using SSO
                </Link>
              </div>

              <div className="text-center mt-6">
                <span className="block text-sm">
                  No organization account yet?{" "}
                </span>
                <Link
                  href={CONNECT_ORGANIZATION_NEW}
                  className="text-primary text-sm underline underline-offset-4"
                >
                  Start a free 14 days trial{" "}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
