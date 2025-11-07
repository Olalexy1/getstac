"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, X, Zap } from "lucide-react";
import React from "react";
import { cn, formatInitials } from "@/lib/utils";

interface AccountManager {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  src?: string;
}

interface AccountManagerModalProps {
  manager: AccountManager;
  triggerClassName?: string;
}

export const AccountManagerModal: React.FC<AccountManagerModalProps> = ({
  manager,
  triggerClassName,
}) => {
  const handleEmail = () => {
    window.location.href = `mailto:${manager.email}`;
  };

  const handleWhatsApp = () => {
    const phone = manager.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "flex items-center gap-2 bg-primary text-white hover:bg-primary/90",
            triggerClassName
          )}
        >
          <Zap className="h-4 w-4" />
          Escalate an issue
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md w-[] rounded-xl p-3"
      >
        {/* <DialogHeader className="space-y-2">
         

        </DialogHeader> */}

        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md border border-primary/30 flex items-center justify-center text-primary">
              <User className="h-4 w-4" />
            </div>
          </div>
          <DialogClose asChild>
            <button
              className="rounded-full p-1.5 hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </DialogClose>
        </DialogHeader>

        <DialogTitle className="text-lg font-semibold text-[#1A1A2E]">
          {manager.firstName + " " + manager.lastName} is your Account Manager
        </DialogTitle>

        <DialogDescription className="text-sm text-muted-foreground">
          The fastest way to have issues resolved is to reach out to your
          account manager ASAP. Find your account manager’s details below.
        </DialogDescription>

        <div className="flex items-center gap-3 mt-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <Avatar>
              <AvatarImage src={manager.src} />
              <AvatarFallback>
                {formatInitials(manager?.firstName, manager?.lastName)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">
              {manager.firstName + " " + manager.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{manager.email}</p>
            <p className="text-sm text-muted-foreground">{manager.phone}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <Button
            className="w-full bg-[#1A1A2E] text-white hover:bg-[#1A1A2E]/90"
            onClick={handleEmail}
          >
            Send an email
          </Button>

          <Button
            variant="outline"
            className="w-full border border-gray-300 hover:bg-gray-50"
            onClick={handleWhatsApp}
          >
            Send a message on WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountManagerModal;
