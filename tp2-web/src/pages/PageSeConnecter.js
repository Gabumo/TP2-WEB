import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export function PageSeConnecter() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated ? (
      <div>
        <h1 className="mt-2">Se déconnecter</h1>
        <p>Appuyer pour se déconnecter.</p>
        <Button onClick={() => logout({ returnTo: window.location.origin })}>Se déconnecter</Button>
        <p className="mt-2"> <Link to="/">Retour à l'accueil</Link> </p>

      </div>
    ) : (
      <div>
        <h1 className="mt-2">Page interdite</h1>
        <p>Vous n'avez pas le droit d'accéder à cette page.</p>
        <Button onClick={() => loginWithRedirect()}>Se connecter</Button>
        <p className="mt-2"> <Link to="/">Retour à l'accueil</Link> </p>
      </div>
    )
  );
}