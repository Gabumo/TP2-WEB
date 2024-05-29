// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export function PageConfirmationSuppression() {
    const { id } = useParams();

    async function handleSuppression() {
        try {
            const response = await fetch(`/api/Clients/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Client supprimé avec succès'); // a revoir
                
            } else {
                alert('Erreur lors de la suppression du client');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du client: ', error);
            alert('Erreur lors de la suppression du client');
        }
    }

    return (
        <div>
            <h2>Confirmation de suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
            <Link to="/liste-clients">
            <Button variant="danger" onClick={handleSuppression}>Confirmer</Button>{' '}
                <Button variant="secondary">Annuler</Button>
            </Link>
        </div>
    );
}