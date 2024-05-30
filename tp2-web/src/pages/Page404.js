import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const Page404 = () => {
    return (
        <>
            <h1>Page introuvable</h1>
            <p>La page que vous recherchez n'existe pas.</p>
            <Link to="/">
                <Button variant="primary">Retour à l'accueil</Button>
            </Link>
        </>
    )
}