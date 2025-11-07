export type NotificationType =
  | "PAYMENT_RECEIVED"
  | "WITHDRAWAL_SUCCESS"
  | "TRANSACTION_FAILED"
  | "REFUND_PROCESSED"
  | "NEW_INVOICE";

export interface NotificationItemType {
  id: string;
  title: string;
  notification_message: string;
  type: NotificationType;
  created_at: string;
  is_read: boolean;
}
