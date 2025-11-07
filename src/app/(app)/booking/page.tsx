"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
import { Calendar, Clock, FileText } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  bookSessionSchema,
  type BookSessionValues,
} from "@/schemas/booking-schema";
import { saveBooking } from "@/store/auth-store";
import Header from "@/components/header";
import Footer from "@/components/footer";

const availableDates = [
  { label: "Tomorrow", value: "2025-11-07" },
  { label: "Next Monday", value: "2025-11-10" },
  { label: "Next Wednesday", value: "2025-11-12" },
  { label: "Next Friday", value: "2025-11-14" },
];

const availableTimes = [
  { label: "9:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "4:00 PM", value: "16:00" },
];

const topics = [
  { label: "General Inquiry", value: "general" },
  { label: "Product Demo", value: "demo" },
  { label: "Pricing Discussion", value: "pricing" },
  { label: "Technical Support", value: "support" },
];

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookSessionValues>({
    resolver: zodResolver(bookSessionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      date: "",
      time: "",
      topic: "",
    },
  });

  async function onSubmit(values: BookSessionValues) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save booking
      saveBooking(values);

      toast.success(
        "Your session has been booked! Check your email for details."
      );

      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to book session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header />
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-4/5 rounded-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              {/* <Image
                src=""
                alt="Professional consultation"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  // Hide image on error, show placeholder instead
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              /> */}
              {/* Placeholder content if image fails to load */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    Professional Consultation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="order-1 lg:order-2">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Book a Session
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our friendly team would love to hear from you. Schedule a
                session with our team. We&apos;ll get back to you shortly.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Full Name */}
                  <div>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="John Doe"
                              className="mt-1"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@company.com"
                              className="mt-1"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date Selection */}
                  <div>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Preferred Date *
                          </FormLabel>
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={isLoading}
                                className="mt-1"
                              >
                                <SelectValue placeholder="Select a date" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableDates.map((date) => (
                                <SelectItem key={date.value} value={date.value}>
                                  {date.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Preferred Time *
                          </FormLabel>
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={isLoading}
                                className="mt-1"
                              >
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableTimes.map((time) => (
                                <SelectItem key={time.value} value={time.value}>
                                  {time.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Topic Selection */}
                  <div>
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Topic *
                          </FormLabel>
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                disabled={isLoading}
                                className="mt-1"
                              >
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {topics.map((topic) => (
                                <SelectItem
                                  key={topic.value}
                                  value={topic.value}
                                >
                                  {topic.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLoading ? "Booking..." : "Book Session"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </main>
  );
}
