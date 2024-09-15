import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { userLogin } from "./serverApi/Authentication/authentication";
import { NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      backendData?: any; // Replace 'any' with a more specific type if you know the structure
    };
  }

  interface User {
    backendData?: any; // Replace 'any' with a more specific type if you know the structure
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    backendData?: any; // Replace 'any' with a more specific type if you know the structure
  }
}
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
        const response = await userLogin({ userEmail: user.email || "", name: user.name || "" });
        // if (response?.status === 200) {
        //   // User exists and was successfully authenticated
        //   return true;
        // } else if (response?.status === 404) {
        //   // User doesn't exist, redirect to signup page
        //   return "/signup?email=" + encodeURIComponent(user.email!);
        // } else {
        //   // Other error occurred
        //   console.error("Failed to authenticate user with backend");
        //   return false;
        // }
        if (response) {
          console.log("RESPONSE IS ", response, user);

          user.backendData = JSON.stringify(response);
        }
      }
      return true;
    }
  }
};

export { authConfig };
