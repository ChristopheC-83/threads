/* eslint-disable react/no-unescaped-entities */
// page de connexion

"use client";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiArrowLeftLight } from "react-icons/pi";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  function validationInputs(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Veuillez remplir un email valide");
      return false;
    }
    return true;
  }

  async function prepareLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!validationInputs(email, password)) {
      return;
    }
    try {
      // nous utilisons ici le provider Credentials
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        return toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
    toast.success("Vous êtes connecté !");
    // replace au lieu de push pour éviter le retour en arrière
    router.replace("/");
  }
  return (
    <div className="mx-auto w-[500px] flex flex-col gap-4">
      <Link className="flex items-center" href="/login">
        <PiArrowLeftLight className="mr-2 text-2xl text-white" />
        <h1 className="title">Connectez-vous!</h1>
      </Link>

      <form action={prepareLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email de l'utilisateur"
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de Passe"
          className="input"
        />
        <Button formButton>
          <p className="text-xl font-bold">Connexion</p>
        </Button>
      </form>
      <div className="flex items-center justify-center mt-4">
        <div className="w-1/4 border-t border-threads-gray-light"></div>
        <div className="mx-4 mb-1 text-threads-gray-light">ou</div>
        <div className="w-1/4 border-t border-threads-gray-light"></div>
      </div>
      <Link href="/login/signup" className="text-xl font-bold">
        <Button>Créer un compte</Button>
      </Link>
    </div>
  );
}
