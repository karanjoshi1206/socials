import GoogleProvider from "next-auth/providers/google";
import { userLogin } from "./serverApi/Authentication/authentication";
import { NextAuthOptions } from "next-auth";

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
    maxAge: 4 * 60 * 60 // 4 hours
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await userLogin({ userEmail: user.email || "", name: user.name || "" });
      }
      return true;
    }
  }
};

export { authConfig };
