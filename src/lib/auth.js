import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { User } from "./models";


async function login(credentials) {

  await connectToDb();

  const user = await User.findOne({
    username: credentials.username,
  });


  if (!user) return null;


  const valid = await bcrypt.compare(
    credentials.password,
    user.password
  );


  if (!valid) return null;


  return {
    id: user._id.toString(),
    email: user.email,
    name: user.username,
  };

}



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({

  secret: process.env.AUTH_SECRET,


  providers: [

    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),


    CredentialsProvider({

      async authorize(credentials){

        return await login(credentials);

      }

    })

  ],


  callbacks: {

    async session({session, token}){

      if(session.user){

        session.user.id = token.sub;

      }

      return session;

    }

  }

});