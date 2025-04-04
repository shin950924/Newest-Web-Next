// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user_id: string;
    accessToken: string;
    refreshToken: string;
  }
}