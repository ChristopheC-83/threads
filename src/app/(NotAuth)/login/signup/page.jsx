/* eslint-disable react/no-unescaped-entities */
// page d'enregistrement
"use client";


import { createUser } from "@/actions/createUser";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiArrowLeftLight } from "react-icons/pi";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();

  function validationInputs(username, pseudo, email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !pseudo || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Veuillez remplir un email valide");
      return false;
    }
    return true;
  }

  async function prepareCreateUser(formData) {
    const username = formData.get("username");
    const pseudo = formData.get("pseudo");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!validationInputs(username, pseudo, email, password)) {
      return;
    }
    try {
      console.log(username, pseudo, email, password);
      await createUser(username, pseudo, email, password);
    } catch (error) {
      //  toast.error("Erreur lors de la création de l'utilisateur");
       toast.error(error.message);
       return
    }
    toast.success("Votre compte a bien été créé! Connectez-vous!");
    router.push("/login/signin");
  }

  return (
    <div className="mx-auto w-[500px] flex flex-col gap-4">
      <Link className="flex items-center" href="/login">
        <PiArrowLeftLight className="mr-2 text-2xl text-white" />
        <h1 className="title">Inscrivez-vous!</h1>
      </Link>

      <form action={prepareCreateUser}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="input"
        />
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo de l'utilisateur"
          className="input"
        />
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
          <p className="text-xl font-bold">S'inscrire</p>
        </Button>
      </form>
      <div className="flex items-center justify-center mt-4">
        <div className="w-1/4 border-t border-threads-gray-light"></div>
        <div className="mx-4 mb-1 text-threads-gray-light">ou</div>
        <div className="w-1/4 border-t border-threads-gray-light"></div>
      </div>
      <Link href="/login/signin" className="text-xl font-bold">
        <Button>Se connecter</Button>
      </Link>
    </div>
  );
}
