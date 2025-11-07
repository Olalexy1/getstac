import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeBasedGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      greeting: "How’s your Morning going",
      message: "How are you feeling this fine morning?",
    };
  } else if (hour < 17) {
    return {
      greeting: "How’s your Afternoon going",
      message: "How are you feeling this fine afternoon?",
    };
  } else {
    return {
      greeting: "How’s your Evening going",
      message: "How are you feeling this fine evening?",
    };
  }
}

export const isActive = (pathname: string, url: string) => {
  if (url === "/dashboard") {
    return pathname === url;
  }
  return pathname.startsWith(url);
};

export function formatInitials(first?: string | null, last?: string | null) {
  const f = (first ?? "").trim();
  const l = (last ?? "").trim();
  return (f[0] ?? "").toUpperCase() + (l[0] ?? "").toUpperCase();
}
