"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export default async function deletePost(postId) {
  // a t on un user connecté ?
  const session = await getServerSession(authOptions);

  // pas de user ?
  if (!session.user) {
    throw new Error("Vous devez être connecté pour publier un post");
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    //identifier le thread
    let post = await db
      .collection("posts")
      .find({ _id: new ObjectId(postId) })
      .limit(1)
      .toArray();

    //   post inexistant
    if (post.length == 0) {
      throw new Error("Post inexistant");
    }

    // user pas auteur de ce post
    if (post[0].pseudo !== session.user.pseudo) {
      throw new Error("Vous ne pouvez pas supprimer ce post");
    }

    // suppression post
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
    } catch (error) {
      throw new Error(error);
    }
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
  await client.close();
  revalidatePath("/", "/[pseudo]");
}
