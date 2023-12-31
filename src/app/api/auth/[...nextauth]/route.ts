import connectDB from "@/config/connectDB";
import User from "@/models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
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

          let user = await User.findOne({ email: credentials!.email }).select(
            "+password"
          );

          if (!user) {
            throw new Error("user not exist");
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
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   profile(profile) {
    //     console.log(profile);

    //     return {
    //       _id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //   },
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
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

      delete session?.user?.password;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
