import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";


const login = async (credentials) => {
  try {
    await connectToDb();

    const user = await User.findOne({
      username: credentials.username,
    });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;

  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({

  ...authConfig,

  providers: [

    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),

  ],


  callbacks: {

    async signIn({ account, profile }) {

      if (account.provider === "github") {

        await connectToDb();

        try {

          const dbUser = await User.findOne({
            email: profile.email,
          });


          if (!dbUser) {

            await User.create({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });

          }

        } catch (err) {

          console.log(err);
          return false;

        }
      }

      return true;
    },


    async jwt({ token, user }) {

      await connectToDb();

      const dbUser = await User.findOne({
        email: token.email,
      });


      if (dbUser) {

        token.id = dbUser._id.toString();
        token.isAdmin = dbUser.isAdmin;

      }


      if (user && !token.id) {
        token.id = user.id;
      }


      return token;
    },


    async session({ session, token }) {

      if (session.user) {

        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;

      }

      return session;
    },


  },

});