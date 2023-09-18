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
