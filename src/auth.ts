import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { dbConnect } from "@/lib/db/mongoose";
import { loginUser } from "@/lib/services/auth";

const authConfig: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          await loginUser({ email: user.email || "", name: user.name || "" });
        } catch (error) {
          console.error("Failed to persist user on Google sign-in", error);
        }
      }
      return true;
    }
  }
};

export { authConfig };
