import { auth } from "@/auth"; // auth.js ফাইলের সঠিক পাথ দিন
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);