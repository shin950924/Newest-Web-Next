// src/lib/auth.ts
import axios from "axios";
import { User } from "../../types";
import { NextAuthOptions } from "next-auth";
import { BASE_URL } from "@/app/api/apiClient";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone_number: { label: "Phone Number", type: "text" },
        verification_code: { label: "Verification Code", type: "text" },
        one_time_token: { label: "One Time Token", type: "text" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(BASE_URL+"/verify_sms_code", {
            phone_number: credentials?.phone_number,
            one_time_token: credentials?.one_time_token,
            verification_code: credentials?.verification_code,
          });

          if (res.data.token) {
            return {
              id: res.data.user_id,
              user_id: res.data.user_id,
              accessToken: res.data.token.access_token,
              refreshToken: res.data.token.refresh_token,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as User;
        token.user_id = customUser.user_id;
        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.user_id as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};