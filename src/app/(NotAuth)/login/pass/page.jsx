// Naviguer sans être connecté

"use client";

import Button from "@/components/Button/Button";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { PiArrowLeftLight } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function Pass() {
  const router = useRouter();
  // création du cookie avec valeur true pour navigation mode invité
  function onContinue() {
    setCookie("guest", "true");
    router.push("/");
  }
  return (
    <div className="mx-auto w-[500px] flex flex-col gap-4">
      <Link className="flex items-center" href="/login">
        <PiArrowLeftLight className="mr-2 text-2xl text-white" />
        <h1 className="title">Continuer en mode Invité</h1>
      </Link>
      <p className="text-threads-gray-light">
        Vous pouvez naviguer dans Threads sans être connecté, mais vous ne
        pourrez pas publier du contenu ni interagir avec les autres membres.
      </p>
      <Button onClick={onContinue}>
        <p className="text-xl font-bold">Continuer</p>
      </Button>
    </div>
  );
}
