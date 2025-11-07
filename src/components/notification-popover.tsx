"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  X,
  CreditCard,
  DollarSign,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDistanceToNow } from "date-fns";
import { NotificationItemType, NotificationType } from "@/types/notification";

const NotificationIcon: React.FC<{ count: number }> = ({ count }) => (
  <div className="relative">
    <Bell className="h-6 w-6" />
    {count > 0 && (
      <div className="absolute -top-3 -right-3 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">
          {count > 99 ? "99+" : count}
        </span>
      </div>
    )}
  </div>
);

const sampleNotifications: NotificationItemType[] = [
  {
    id: "1",
    title: "Payment Received",
    notification_message: "You received ₦120,000 from BlueCollar Ltd.",
    type: "PAYMENT_RECEIVED",
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    is_read: false,
  },
  {
    id: "2",
    title: "Withdrawal Successful",
    notification_message: "₦45,000 has been transferred to your bank account.",
    type: "WITHDRAWAL_SUCCESS",
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    is_read: false,
  },
  {
    id: "3",
    title: "Transaction Failed",
    notification_message:
      "Your attempt to send ₦15,000 failed due to insufficient balance.",
    type: "TRANSACTION_FAILED",
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    is_read: true,
  },
  {
    id: "4",
    title: "Refund Processed",
    notification_message:
      "₦7,500 refund from TechWorld has been credited to your wallet.",
    type: "REFUND_PROCESSED",
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    is_read: true,
  },
  {
    id: "5",
    title: "New Invoice",
    notification_message:
      "An invoice of ₦250,000 is due for payment in 3 days.",
    type: "NEW_INVOICE",
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    is_read: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "PAYMENT_RECEIVED":
      return <DollarSign className="h-4 w-4" />;
    case "WITHDRAWAL_SUCCESS":
      return <ArrowDownCircle className="h-4 w-4" />;
    case "TRANSACTION_FAILED":
      return <AlertTriangle className="h-4 w-4" />;
    case "REFUND_PROCESSED":
      return <ArrowUpCircle className="h-4 w-4" />;
    case "NEW_INVOICE":
      return <Receipt className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "PAYMENT_RECEIVED":
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    case "WITHDRAWAL_SUCCESS":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    case "TRANSACTION_FAILED":
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    case "REFUND_PROCESSED":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "NEW_INVOICE":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
  }
};

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
    <h3 className="text-lg font-semibold text-zinc-900">All caught up!</h3>
    <p className="text-sm text-center mt-2 text-zinc-600">
      You have no new transaction notifications at the moment.
    </p>
  </div>
);

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!notification.is_read) onMarkAsRead(notification.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer hover:bg-gray-50 p-3 rounded-md transition-colors group",
        !notification.is_read && "bg-blue-50"
      )}
      onClick={handleClick}
    >
      {!notification.is_read && (
        <div className="w-2 h-2 mt-2 me-3 rounded-full bg-primary shrink-0"></div>
      )}

      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center me-3 shrink-0",
          getNotificationColor(notification.type)
        )}
      >
        {getNotificationIcon(notification.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm text-gray-900 truncate">
            {notification.title}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
            onClick={handleDelete}
          >
            <X className="h-3 w-3 text-destructive" />
          </Button>
        </div>

        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {notification.notification_message}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(notification.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export const NotificationPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItemType[]>(sampleNotifications);
  const isMobile = useIsMobile();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const content = (
    <div className="flex w-full flex-col items-center justify-center text-card-foreground">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Transactions</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {unreadCount > 0
            ? `You have ${unreadCount} unread transaction${unreadCount > 1 ? "s" : ""}`
            : "You're all caught up!"}
        </p>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={handleMarkAllAsRead}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <ScrollArea
        className={`relative flex w-full ${isMobile ? "h-[calc(100vh-150px)]" : "max-h-[400px]"}`}
      >
        {notifications.length > 0 ? (
          <div className="flex min-w-0 flex-1 flex-col gap-2 p-2">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative p-2">
            <NotificationIcon count={unreadCount} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:max-w-sm p-0 flex flex-col"
        >
          <SheetHeader className="px-4 pt-4" />
          <div className="flex-1 overflow-hidden">{content}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <NotificationIcon count={unreadCount} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[400px] max-w-[95vw] p-0 border-primary"
        align="end"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
