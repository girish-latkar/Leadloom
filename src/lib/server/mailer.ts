import "server-only";

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import { getRegistrationEmailConfig } from "@/lib/server/emailConfig";

let transporter: Transporter | null = null;

export function getMailTransporter(): Transporter {
  if (!transporter) {
    const config = getRegistrationEmailConfig();

    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  return transporter;
}
