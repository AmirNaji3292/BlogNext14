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

        return await login(credentials);

      },

    }),

  ],


  callbacks: {

    async session({ session }) {

      if (session.user?.email) {

        await connectToDb();

        const dbUser = await User.findOne({
          email: session.user.email,
        });


        if (dbUser) {

          session.user.id = dbUser._id.toString();
          session.user.isAdmin = dbUser.isAdmin;

        }

      }


      return session;

    },

  },

});