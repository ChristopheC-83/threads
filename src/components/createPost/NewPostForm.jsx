"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import createPost from "@/actions/createPost";

export default function NewPostForm({ closeModale = () => {} }) {
  const { data: session } = useSession();
  const [textarea, setTextarea] = useState("");

  async function onPrepare(formData) {
    try {
      await createPost(formData);
      setTextarea("");
      toast.success("Post publié");
    } catch (error) {
      console.error(error);
      return toast.error(error.message);
    }
    closeModale();
  }

  return (
    <form action={onPrepare}>
      <div className="flex gap-3">
        <div>
          <Image
            src={session?.user.profile}
            alt="user"
            width={50}
            height={50}
            className="mt-5 rounded-full"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Commencer un thread..."
            className="input"
            name="content"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className={`new-thread-btn ${
            textarea.length < 1 && "disabled-new-thread-btn"
          }`}
        >
          Publier
        </button>
      </div>
    </form>
  );
}
