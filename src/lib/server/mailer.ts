import "server-only";

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import { getRegistrationEmailConfig } from "@/lib/server/emailConfig";

let transporter: Transporter | null = null;

export function getMailTransporter(): Transporter {
  if (!transporter) {
    const config = getRegistrationEmailConfig();
    const useStartTls = config.port === 587 && !config.secure;

    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      requireTLS: useStartTls,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  return transporter;
}

/** Clear cached transporter after auth failures so credential updates take effect. */
export function resetMailTransporter(): void {
  transporter = null;
}
