/* eslint-disable react/no-unescaped-entities */
// Page de connexion

import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      {/* title */}
      <h1 className="title">
        Comment souhaitez-vous utiliser Threads ?
      </h1>
      <div className="mx-auto w-[500px] flex flex-col gap-4">
        {/* signup / signin */}
        <Link href="/login/signup">
          <div className="auth-method">
            <h2 className="font-bold">
              S'inscrire ou se connecter avec une adresse email
            </h2>
            <div className="mt-4 text-threads-gray-light">
              Connectez-vous ou créez un profil avec une adresse email. Cela
              vous permettra de publier du contenu et d'intergair sur Threads.
            </div>
          </div>
        </Link>

        {/* invited */}
        <Link href="/login/pass">
          <div className="auth-method">
            <h2 className="font-bold">
              Utiliser sans profil
            </h2>
            <div className="mt-4 text-threads-gray-light">
              Vous pouvez naviguer dans Threads sans profil, mais vous ne pourrez pas publier du contenu ni interagir avec les autres membres.
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
