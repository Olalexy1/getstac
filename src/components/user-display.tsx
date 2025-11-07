import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  src?: string;
  fallback: string;
  name: string;
  store?: string;
  isOnline?: boolean;
}

export const UserDisplay: React.FC<Props> = ({
  src,
  fallback,
  name,
  store,
  isOnline,
}) => (
  <div className="items-center gap-3 hidden md:flex">
    <div className="relative">
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {isOnline && (
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#242440] ring-2 ring-background" />
      )}
    </div>
    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">welcome back to {store}</p>
    </div>
  </div>
);
