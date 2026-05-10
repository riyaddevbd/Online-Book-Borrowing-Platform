import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";

let authHandler;

async function getAuthHandler() {
  if (authHandler) return authHandler;

  await connectDB();

  const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    trustedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://online-book-borrowing-platform2.vercel.app',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ].filter(Boolean),
    database: mongodbAdapter(mongoose.connection.db),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectURI: `${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/api/auth/callback/google`,
      },
    },
    advanced: {
      cookiePrefix: 'library-platform',
      crossSubDomainCookies: {
        enabled: true,
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
    },
  });

  authHandler = auth.handler;
  return authHandler;
}

export async function GET(req) {
  const handler = await getAuthHandler();
  return handler(req);
}

export async function POST(req) {
  const handler = await getAuthHandler();
  return handler(req);
}
