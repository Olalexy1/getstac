"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { signInSchema, type SignInFormValues } from "@/schemas/auth-schema";
import { mockUsers, setAuthSession } from "@/store/auth-store";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true);
    console.log(values);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const user = mockUsers.find((u) => u.email === values.emailAddress);

      if (!user) {
        toast.error("Email not found. Please check and try again.");
        setIsLoading(false);
        return;
      }

      if (user.password !== values.password) {
        toast.error("Invalid password. Please try again.");
        setIsLoading(false);
        return;
      }

      if (values.rememberMe) {
        setAuthSession(
          {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          7 * 24 * 60 * 60 * 1000 // One week in ms
        );
      } else {
        setAuthSession({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }

      toast.success(`Welcome back, ${user.firstName}!`);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="w-full max-w-md border border-border bg-card p-8 shadow-lg">
        <h1 className="mb-8 text-2xl font-semibold text-card-foreground">
          Sign in to your account
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) =>
              console.log(error)
            )}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane.doe@gmail.com"
                      type="email"
                      disabled={isLoading}
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
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium">
                      Password
                    </FormLabel>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••••••"
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Stay signed in for a week
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </form>
        </Form>

        <Link
          href="#"
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Validate your new account
        </Link>
      </div>

      <div className="mt-6 space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/booking"
            className="font-semibold text-foreground hover:underline transition-colors"
          >
            Book a Session First!
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          © Getstac · Contact · Privacy & terms
        </p>
      </div>
    </>
  );
}
