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
        // if (response) {
        //   console.log("RESPONSE IS ", response, user);

        //   user.backendData = JSON.stringify(response);
        // }
      }
      return true;
    }
  }
};

export { authConfig };
