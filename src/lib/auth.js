import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma"; // ✅ Imports the singleton fixed above

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        
        if (!passwordMatch) return null;

        return { id: admin.id, name: admin.username };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};