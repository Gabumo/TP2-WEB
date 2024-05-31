import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';

export function PageConfirmationSuppression() {
    const { id } = useParams();
    const [clientSupprime, setClientSupprime] = useState(false);

    async function handleSuppression() {
        
            const response = await fetch(`/api/Clients/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Client supprimé avec succès'); // a revoir
                setClientSupprime(true)
            } else {
                alert('Erreur lors de la suppression du client');
                
            }
    }

    return (
        <>
            {!clientSupprime ? (
        <div>
            <h2>Confirmation de suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
            <Button variant="danger" onClick={handleSuppression}>Confirmer</Button>{' '}
            <Link to="/liste-clients">
                <Button variant="secondary">Annuler</Button>
            </Link>
        </div>
    ) : (
        <>
            <p>Client supprime</p>
        <Link to="/liste-clients">
            <Button variant="secondary">Retour</Button>
        </Link>
        </>
    )}

    </>
    );
}