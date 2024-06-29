import { connectToDatabase } from "@/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = await connectToDatabase();
      const db = client.db("quixlardb");
      const usersCollection = db.collection("users");
      const dbUser = await usersCollection.findOne({ email: user.email });
      if (!dbUser) await usersCollection.insertOne({ ...user, quizzes: [] });
      return true;
    },
  },
};

export default NextAuth(authOptions);
