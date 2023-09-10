import nodemailer from "nodemailer";

interface SendEmailProps {
  from: string;
  to: string;
  html: string;
  text: string;
  subject: string;
}

const sendEmail = async ({ from, to, html, text, subject }: SendEmailProps) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from,
    to,
    text,
    html,
    subject,
  });
};

export default sendEmail;
