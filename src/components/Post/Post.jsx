"use client";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useState } from "react";
import { toast } from "sonner";
import deletePost from "@/actions/deletePost";

export default function Post({ post }) {
  const [optionsAreOpen, setOptionsAreOpen] = useState(false);
  const { data: session } = useSession();

  async function onDeletePost() {
    if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return;
    try {
      await deletePost(post._id);
      
    } catch (error) {
      return toast.error(e.message);
    }
    toast.success("Post supprimé");
  }

  return (
    <div className="post w-11/12  md:w-[700px] mx-auto">
      <div>
        <Image
          src={post.profile}
          alt="avatar"
          width={50}
          height={50}
          className="object-cover rounded-full"
          unoptimized
        />
      </div>
      <div className="w-full text-white">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="relative flex items-center gap-1 text-sm text-threads-gray-light">
            <div className="text-sm text-threads-gray-light">
              {moment
                .utc(post.creation, "YYYY-MM-DDTHH:mm:ss.SSSZ")
                .tz("Europe/Paris")
                .fromNow()}
            </div>
            {session?.user && (
              <div>
                <PiDotsThreeOutlineFill
                  className="ml-2 cursor-pointer"
                  onClick={() => setOptionsAreOpen(!optionsAreOpen)}
                />
              </div>
            )}
            {/* options */}
            {optionsAreOpen && session?.user && (
              <div className="options">
                {session?.user && session.user.pseudo !== post.pseudo ? (
                  <div className="option">Signaler </div>
                ) : (
                  <>
                    <div className="option">Modifier </div>
                    <div className="option" onClick={onDeletePost}>
                      Supprimer{" "}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 whitespace-pre-line text-neutral-20">
          {post.content}
        </div>
      </div>
    </div>
  );
}
