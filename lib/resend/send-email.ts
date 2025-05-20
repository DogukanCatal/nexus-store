import { Resend } from "resend";
import type { CreateEmailResponse } from "resend";
import type { ReactElement } from "react";

// 👇 Generic template type with props
type Template<T> = (props: T) => ReactElement;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail<T>(
  to: string[],
  subject: string,
  template: Template<T>,
  props: T
): Promise<CreateEmailResponse> {
  return await resend.emails.send({
    from: `Nexus Store <${process.env.RESEND_SENDER_EMAIL}>`,
    to,
    subject,
    react: template(props) as ReactElement,
  });
}
