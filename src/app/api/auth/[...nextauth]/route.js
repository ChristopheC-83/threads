import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          // connexion au cluster
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

          // connexion à mongodb db
          const db = client.db(process.env.MONGODB_DATABASE);

          // recup le user de l'email

          let user = await db
            .collection("users")
            .find({ email })
            .limit(1)
            .toArray();

          // si pas d'email
          if (user.length === 0) {
            await client.close();
            throw new Error("Cet email n'existe pas");
          }

          // vérifier le password
          const isPasswordValid = await bcrypt.compare(
            password,
            user[0].password
          );
          // mdp invalide
          if (!isPasswordValid) {
            await client.close();
            throw new Error("Mot de passe incorrect");
          }

          // on peut authentifier le user
          // on retourne un objet avec les infos du user
          // attention, tout ce qu'on va stocker sera visible !
          // donc pas de mdp décodé !!! adresse, code cb...

          user = user.map((user) => ({
            _id: user._id.toString(), // on transforme l'objet _id en string
            username: user.username,
            pseudo: user.pseudo,
            email: user.email,
            profile: user.profile,
            bio: user.bio,
            url: user.url,
          }))[0];
          await client.close();

          return user;
        } catch (e) {
          throw new Error(e.message);
        }
      },
    }),
    // facebook, google, github...
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.user;

      const { email } = session.user;
      let client;
      client = await MongoClient.connect(process.env.MONGODB_CLIENT);
      const db = client.db(process.env.MONGODB_DATABASE);

      let userDb = await db
        .collection("users")
        .find({ email })
        .limit(1)
        .toArray();

      userDb = userDb.map((user) => ({
        _id: user._id.toString(),
        username: user.username,
        pseudo: user.pseudo,
        email: user.email,
        profile: user.profile,
      }))[0];

      await client.close();

      session = {
        ...session,
        user: { ...userDb },
      };

      return session;
    },
  },
};

// on envoie l'objet user créé à nextauth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
