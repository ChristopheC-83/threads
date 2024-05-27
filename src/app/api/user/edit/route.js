import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export async function POST(request) {
  // on recup les donnée envoyé par le client pour le server
  const data = await request.json();

  let pseudo = data.pseudo;
  let profile = data.profile;
  let bio = data.bio;
  let url = data.url;

  if (!bio) {
    bio = "-";
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // on recup le user
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (!user) {
      await client.close();
      return NextResponse.json(
        {
          error: "Utilisateur non trouvé",
        },
        { status: 404 }
      );
    }

    // on met à jour le user
    await db.collection("users").updateOne(
      { pseudo },
      {
        $set: {
          profile,
          bio,
          url,
        },
      }
    );

    await client.close();
    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    await client.close();
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
