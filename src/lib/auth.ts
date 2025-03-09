import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/webUser";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          isProfileComplete: user.isProfileComplete,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.isProfileComplete = user.isProfileComplete;
      }

      if (account && account.provider === "google") {
        await connectToDB();

        const existingUser = await User.findOne({ email: token.email });

        if (existingUser) {
          if (!existingUser.googleId) {
            await User.findByIdAndUpdate(existingUser._id, {
              googleId: token.sub,
            });
          }

          token.id = existingUser._id.toString();
          token.isProfileComplete = existingUser.isProfileComplete;
        } else {
          const newUser = await User.create({
            email: token.email,
            fullName: token.name,
            googleId: token.sub,
            isProfileComplete: false,
          });

          token.id = newUser._id.toString();
          token.isProfileComplete = false;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login?error=AuthError",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
