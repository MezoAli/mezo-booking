import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      image: string;
      name: string;
      _id: string;
      avatar: {
        public_id: string;
        url: string;
      };
      role: "user" | "admin";
      resetPasswordToken?: string;
      resetPasswordExpire?: Date;
    };
  }
}

// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "294f54f020b092",
//     pass: "ec359692f7f3c3"
//   }
// });
