//  si non connecté, on redirige vers la page login
//  on ne peut pas utiliser next/navigation qui est coté client car nous sommes coté server ici
// on utilise alors la request

//  on utlise une dépendance pour gérer les cookies car nous en avons besoin coté server également
// pas seulement coté client comme dans React

import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  let isAuthenticated = false;

  // is invited ?
  // cookie guest est il présent dans les cookies de l'utilisateur ?
  if (hasCookie("guest", { cookies })) {
    isAuthenticated = true;
  }

  // if connected ?  bidouille à moi pour le moment
  if (hasCookie("next-auth.session-token", { cookies })) {
    isAuthenticated = true;
  }

  // if authenticated ?
  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/"] };
