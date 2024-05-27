"use client";

import Button from "@/components/Button/Button";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

export default function Profile({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const pseudo = params.pseudo.slice(3); // pour enlever le %40 en début de slug

  //  recup des infos dans un state
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [openModale, setOpenModale] = useState(false);
  const [profileInput, setProfileInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUserDataPosts() {
    const response = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      toast.error("Erreur lors de la récupération des données");
    }
    if (!data.user) {
      router.push("/");
      toast.info("Utilisateur introuvable");
      return;
    }
    setUser(data.user);
    setPosts(data.posts);
  }

  async function edit() {
    // les inputs
    setProfileInput(user.profile);
    setBioInput(user.bio);
    setLinkInput(user.url);
    // ouvrir le modal
    setOpenModale(true);
  }

  useEffect(() => {
    // if (!pseudo) {
    //   router.push("/")
    // }
    fetchUserDataPosts();
  }, []);

  async function editUser() {
    if (isLoading) return;
    setIsLoading(true);
    const response = await fetch(`/api/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo,
        profile: profileInput,
        bio: bioInput,
        url: linkInput,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      toast.error("Erreur lors de la modification du profil");
      return;
    }

    const newUser = {
      ...user,
      profile: profileInput,
      bio: bioInput,
      url: linkInput,
    };
    setIsLoading(false);
    setUser(newUser);
    setOpenModale(false);
    toast.success("Profil modifié");
  }

  return (
    <ConnectedLayout>
      {openModale &&
        createPortal(
          <div
            className="modale-background"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModale(false);
              }
            }}
          >
            <div className="modale-user-foreground">
              {/*  photo*/}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label htmlFor="" className="label" htlmFor="picture">
                    Photo de Profil
                  </label>
                  <input
                    type="url"
                    name="picture"
                    id="picture"
                    className="input"
                    placeholder="https://www..."
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                  />
                </div>
                <div>
                  <Image
                    src={profileInput}
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                    alt="avatar"
                    unoptimized
                  />
                </div>
              </div>
              {/* bio */}
              <div className="mt-5">
                <label htmlFor="bio" className="label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="input"
                  placeholder="Bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                ></textarea>
              </div>
              {/* url */}
              <div className="mt-5">
                <label htmlFor="url" className="label">
                  Lien
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  className="input"
                  placeholder="https://www..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-1">
                <div>
                  <Button onClick={editUser} disabled={isLoading}>
                    Terminer
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <div className="w-11/12  md:w-[700px] mx-auto">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <div className="mt-2 text-threads-gray-light">@{user.pseudo}</div>
            <div className="mt-5 whitespace-pre-line">{user.bio}</div>
            <div className="mt-5 text-blue-500 duration-200 hover:text-blue-400">
              {user.url && (
                <a href={user.url} target="_blank">
                  {user.url}
                </a>
              )}
            </div>
          </div>
          <div>
            <Image
              src={user.profile}
              width={100}
              height={100}
              className="object-cover rounded-full"
              alt="avatar"
              unoptimized
            />
          </div>
        </div>
        {/* modifier profil */}
        {session?.user?.pseudo === pseudo && (
          <div className="user-button" onClick={edit}>
            Modifier le profil
          </div>
        )}

        {/* tabs */}
        <div className="flex mt-10">
          {/* threads */}
          <div className="flex-1 px-4 pb-4 text-center duration-200 border-b border-white cursor-pointer hover:text-white hover:border-white">
            Threads
          </div>
          {/* responses */}
          <div className="flex-1 px-4 pb-4 text-center duration-200 border-b cursor-pointer text-threads-gray-light border-threads-gray-light hover:text-white hover:border-white">
            Réponses
          </div>
          {/* repost */}
          <div className="flex-1 px-4 pb-4 text-center duration-200 border-b cursor-pointer text-threads-gray-light border-threads-gray-light hover:text-white hover:border-white">
            Republication
          </div>
        </div>
        {/* posts */}
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
