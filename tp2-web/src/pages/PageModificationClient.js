import React, { useState, useEffect } from 'react';
import { Col, Alert, Form, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export function PageModificationClient() {
    const { id } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [donneesValides, setDonneesValides] = useState(true);
    const [clientModifie, setClientModifie] = useState(false);
    const [chargementClient, setChargementClient] = useState(true);
    const [client, setClient] = useState(null);

    useEffect(() => {
        async function recupererClient() {
            setChargementClient(true);
            try {
                const reponse = await fetch(`/api/Clients/${id}`);
                const donnees = await reponse.json();
                console.log(donnees);
                if (donnees) {
                    const dateFormatee = donnees.dateNaissance.split('T')[0];
                    setClient(donnees);
                    setNom(donnees.nom);
                    setPrenom(donnees.prenom);
                    setDateNaissance(dateFormatee);
                } else {
                    setClient(null);
                }
            } catch (error) {
                console.error("Erreur dans la récupération du client: ", error);
                setClient(null);
            }
            setChargementClient(false);
        }
        recupererClient();
    }, [id]);

    // Masquer le message d'alerte de modification d'un client après 5 secondes
    useEffect(() => {
        if (clientModifie) {
            const timer = setTimeout(() => {
                setClientModifie(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [clientModifie]);

    async function gererSoumission(e) {
        e.preventDefault();

        // Validation des données min 2 caractères pour le nom ou date de naissance plus grand que aujourd'hui
        if (nom.length < 2 || prenom.length < 2 || new Date(dateNaissance) > new Date()) {
            setDonneesValides(false);
            setClientModifie(false);
            return;
        }
        setDonneesValides(true);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                clientId: id,
                nom: nom, 
                prenom: prenom, 
                dateNaissance: dateNaissance
             })
        };

        try {
            const reponse = await fetch(`/api/Clients/${id}`, requestOptions);
            if (reponse.ok) {
                    setClientModifie(true);
                } else {
                    alert('Erreur lors de la modification du client');
                }
            } catch (error) {
            console.error('Erreur lors de la modification du client: ', error);
            alert('Erreur lors de la modification du client');
        }
    }

    return (
        <>
            <h1>Modification d'un client</h1>
            {chargementClient && <p>Chargement du client...</p>}
            {!chargementClient && client &&
                <Form onSubmit={gererSoumission}>
                    <Form.Group as={Col} controlId="nom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            value={nom}
                            onChange={e => setNom(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="prenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            value={prenom}
                            onChange={e => setPrenom(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="dateNaissance">
                        <Form.Label>Date de naissance</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateNaissance}
                            onChange={e => setDateNaissance(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="mt-3">
                        <Button className="me-2" variant="primary" type="submit">
                            Modifier
                        </Button>

                        <Link to="/liste-clients">
                            <Button variant="secondary">Retour à la liste des clients</Button>
                        </Link>
                    </div>
                    
                    {!donneesValides && 
                        <Alert className="mt-3" variant="danger">
                            Les données entrées ne sont pas valides :
                            <ul>
                                {nom.length < 2 &&
                                    <li>Le nom doit contenir au moins 2 caractères.</li>}
                                {prenom.length < 2 && 
                                    <li>Le prénom doit contenir au moins 2 caractères.</li>}
                                {new Date(dateNaissance) > new Date() && 
                                    <li>La date de naissance doit être inférieure à la date d'aujourd'hui.</li>}
                            </ul>
                        </Alert>
                    }

                    {clientModifie && <Alert className="mt-3" variant="success">Le client a été modifié.</Alert>}
                </Form>
            }
            {!chargementClient && !client && <Alert variant="danger">Client introuvable !</Alert>}

        </>
    );
}
