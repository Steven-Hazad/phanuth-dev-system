// src/lib/auth.js
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const admin = await prisma.admin.findUnique({ 
          where: { username: credentials.username } 
        });

        if (!admin) return null;

        const passwordMatch = await bcrypt.compare(credentials.password, admin.password);
        if (!passwordMatch) return null;

        return { id: admin.id, name: admin.username };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET, // 🛡️ Important!
  pages: { signIn: "/login" },
};