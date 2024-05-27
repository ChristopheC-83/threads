// Nous créons un composant layout juste pour les utilisateurs connectés.
"use client";
import { Toaster } from "sonner";
import Footer from "../Footer/Footer";
import ConnectedHeader from "./ConnectedHeader";
import { useSession } from "next-auth/react";

export default function ConnectedLayout({ children }) {

  const {data : session} = useSession();
  // console.log(session)

  
  
  return (
    <section className="flex flex-col w-full min-h-screen">
      {/* header */}
      <ConnectedHeader session={session} />

      {/* content */}
      <div className="flex-1">
        <Toaster position="top-center" richColors expand={true}/>{children}</div>

      {/* footer */}
      <Footer />
    </section>
  );
}
