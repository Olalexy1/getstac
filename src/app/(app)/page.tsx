"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`We've sent early access details to ${email}`);
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6 py-12 md:px-12 md:py-20">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-balance text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Cash on demand for POS Agents.
            </h1>

            <p className="mt-6 text-balance text-lg text-gray-400 md:text-xl">
              Request working cash in minutes and pick it up nearby, so you
              never turn a customer away. Clear fees. Fast support.
            </p>

            {/* Email Form */}
            <form
              onSubmit={handleEarlyAccess}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-gray-600 bg-white px-4 py-3 text-slate-950 placeholder:text-gray-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-slate-950 px-8 text-white hover:bg-slate-900"
              >
                {isLoading ? "Sending..." : "Get Early Access"}
              </Button>
            </form>
          </div>

          {/* Right Side - Product Screenshot Area */}
          <div className="relative flex items-center justify-center">

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
