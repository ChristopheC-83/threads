"use client";

import Link from "next/link";
import { PiHouseFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Button from "../Button/Button";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { deleteCookie } from "cookies-next";
import { PiNotePencilBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewPostForm from "../createPost/NewPostForm";

export default function ConnectedHeader({ session }) {
  // on récupère notre adresse actuelle
  const pathname = usePathname();
  console.log("session : ", session);

  const [openModale, setOpenModale] = useState(false);

  // on bloque le scroll si modale ouverte
  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);

  return (
    <header className="relative flex items-center justify-between p-7">
      {openModale &&
        createPortal(
          <div className="modale-background" onClick={()=>setOpenModale(false)}>
            <div className="modale-foreground" onClick={(e) => e.stopPropagation()}>
              <NewPostForm closeModale={()=>setOpenModale(false)}/>
            </div>
          </div>,
          document.body
        )}
      <Image
        src="/logo.png"
        alt="threads"
        width={40}
        height={40}
        className="z-10"
      />
      <nav className="absolute inset-0 z-0 flex items-center justify-center gap-4 py-4">
        {/* home */}
        <Link href="/">
          <PiHouseFill
            className={`w-14 h-14 transition duration-200 text-threads-gray-light hover:text-white hover:bg-neutral-800 p-1 rounded-xl ${
              pathname == "/" && "text-white"
            }`}
          />
        </Link>
        {/* loupe icone pour recherche */}
        <Link href="/search">
          <IoSearch
            className={`w-14 h-14 transition duration-200 text-threads-gray-light hover:text-white hover:bg-neutral-800 p-1   rounded-xl ${
              pathname == "/search" && "text-white"
            }`}
          />
        </Link>
        {/* new post */}
        {session?.user?.email && (
          <PiNotePencilBold
            className={`w-14 h-14 transition duration-200 text-threads-gray-light hover:text-white hover:bg-neutral-800 p-1 cursor-pointer rounded-xl ${
              pathname == "/write" && "text-white"
            }`}
            onClick={() => setOpenModale(true)}
          />
        )}
        {/*image profil */}
        {session?.user?.email && (
          <Link href={`/@${session?.user?.pseudo}`}>
            <Image
              src={session?.user?.profile}
              width={70}
              height={70}
              className={`object-cover rounded-full p-2 hover:bg-neutral-800 ${
                pathname == `/@${session?.user?.pseudo}` &&
                "border-2 border-neutral-200"
              }`}
              alt="avatar"
            />
          </Link>
        )}
      </nav>
      <div className="z-10">
        <Link href="/login">
          {session?.user?.email ? (
            <Button withoutMarginTop onClick={() => signOut()}>
              Se Déconnecter
            </Button>
          ) : (
            <Button withoutMarginTop>Se Connecter</Button>
          )}
        </Link>
      </div>
    </header>
  );
}
