import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
export async function POST(request) {
  // recup du pseudo
  const data = await request.json();
  const { pseudo } = data;
  let client;
  // un user connecté
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    //   recup le user
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    // formattage données
    user = user.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }))[0];

    // recup des posts
    let posts = await db
      .collection("posts")
      .find({ pseudo })
      .sort({ creation: -1 })
      .toArray();

    // formattage données
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
    await client.close();

    return NextResponse.json(
      {
        user,
        posts,
      },
      { status: 200 }
    );
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
}
