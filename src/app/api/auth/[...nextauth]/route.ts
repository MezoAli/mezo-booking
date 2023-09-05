import connectDB from "@/config/connectDB";
import User from "@/models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        // const { email, password } = credentials;

        try {
          connectDB();

          let user = await User.findOne({ email: credentials!.email });

          if (!user) {
            return null;
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials!.password,
            user?.password
          );

          if (!isCorrectPassword) {
            throw new Error("password is in correct");
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  //   pages: {
  //     signIn: "/auth/signin",
  //   },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
