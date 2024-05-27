"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { toast } from "sonner";

export default async function createPost(formData) {
  // a t on un user connecté ?
  const session = await getServerSession(authOptions);

  // pas de user ?
  if (!session.user) {
    throw new Error("Vous devez être connecté pour publier un post");
  }

  let client
  // un user connecté
  try {
    // connexion cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // connection db
    const db = client.db(process.env.MONGODB_DATABASE);

    //   ajouter post à la db
    await db.collection("posts").insertOne({
      pseudo: session.user.pseudo,
      content: formData.get("content"),
      profile: session.user.profile,
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
  await client.close();
}
