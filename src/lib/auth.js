import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { User } from "./models";


const login = async (credentials) => {

  await connectToDb();

  const user = await User.findOne({
    username: credentials.username,
  });


  if (!user) return null;


  const passwordCorrect = await bcrypt.compare(
    credentials.password,
    user.password
  );


  if (!passwordCorrect) return null;


  return user;
};



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({

  providers: [

    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),


    CredentialsProvider({

      async authorize(credentials) {

        const user = await login(credentials);

        return user;

      },

    }),

  ],


  callbacks: {

    async session({ session, token }) {

      if (session.user) {

        session.user.id = token.sub;

      }

      return session;

    },

  },

});