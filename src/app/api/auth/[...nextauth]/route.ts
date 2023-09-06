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
            throw new Error("user not exist");
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
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
