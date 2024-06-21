import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import User from "@/models/userModel";
import { connectDB } from "@/mongodb/connect";
connectDB();

export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  session: {
    maxAge: 31536000, // 1 year
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const currentUser = await User.findOne({ email: user.email }).lean();
        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            username: user.email.split("@")[0],
            profilepic: user.image || undefined,
          });
          await newUser.save();
          user.username = newUser.username;
          user.name = newUser.username;
        } else {
          user.username = currentUser.username;
          user.name = currentUser.name;
        }
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // If user is present, it means this is during sign in
      if (user) {
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const currentUser = await User.findOne({ email: session.user.email }).lean();
        if (currentUser) {
          session.user.email = currentUser.email;
          session.user.name = currentUser.name;
          session.user.username = currentUser.username;
          session.user.profilepic = currentUser.profilepic;
          session.user.coverpic=currentUser.coverpic;
          session.user.userid=currentUser._id;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      return session;
    }
  }
});

export { authOptions as GET, authOptions as POST };
