import OrderConfirmation from "@/components/email/OrderConfirmationEmail";
import { OrderConfirmationProps } from "./order-confirmation";

export type EmailTemplates = {
  order: {
    component: typeof OrderConfirmation;
    props: OrderConfirmationProps;
    subject: string;
  };
};
