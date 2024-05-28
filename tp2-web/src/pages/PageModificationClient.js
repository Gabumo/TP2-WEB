import React, { useState, useEffect } from 'react';
import { Col, Alert, Form, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

export function PageModificationClient() {
    const { id } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [donneesValides, setDonneesValides] = useState(true);
    const [clientModifie, setClientModifie] = useState(false);
    const [chargementClient, setChargementClient] = useState(true);
    const [client, setClient] = useState(null);
    const [erreurs, setErreurs] = useState([]);

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

    function checkErreurs() {
        erreurs.length = 0;
        if (nom.length < 2) {
            erreurs.push('Le nom doit contenir au moins 2 caractères.');
        }
        if (prenom.length < 2) {
            erreurs.push('Le prénom doit contenir au moins 2 caractères.');
        }
        if (new Date(dateNaissance) > new Date()) {
            erreurs.push('La date de naissance doit être inférieure à la date d\'aujourd\'hui.');
        }
        return erreurs.length === 0;
    }

    async function gererSoumission(e) {
        e.preventDefault();

        // Validation des données min 2 caractères pour le nom ou date de naissance plus grand que aujourd'hui
        if (!checkErreurs()) {
            setDonneesValides(false);
            //setClientModifie(false);
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

    async function gererSuppressionAdresse(adresseId) {
        try {
            const reponse = await fetch(`/api/clients/${id}/Adresses/${adresseId}`, { method: 'DELETE' });
            if (reponse.ok) {
                setClient(prevClient => ({
                    ...prevClient,
                    adresses: prevClient.adresses.filter(adresse => adresse.adresseId !== adresseId)
                }));
            } else {
                alert('Erreur lors de la suppression de l\'adresse');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'adresse: ', error);
            alert('Erreur lors de la suppression de l\'adresse');
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
                    
                    {!donneesValides && !checkErreurs() &&
                        <Alert className="mt-3" variant="danger">
                            Les données entrées ne sont pas valides :
                            <ul>
                                {erreurs.map((erreur, index) => (
                                    <li key={index}>{erreur}</li>
                                ))}
                            </ul>
                        </Alert>
                    }

                    {clientModifie && <Alert className="mt-3" variant="success">Le client a été modifié.</Alert>}
                </Form>
            }
            {!chargementClient && client.adresses && client.adresses.length > 0 &&
                <>
                    <h2 className="mt-3">Adresses</h2>
                    <Accordion defaultActiveKey="0">
                    {client.adresses.map(adresse => (
                        <Accordion.Item key={adresse.adresseId} eventKey={adresse.adresseId}>
                            <Accordion.Header><strong>{adresse.numeroCivique}, {adresse.typeVoie} {adresse.odonyme}</strong></Accordion.Header>
                            <Accordion.Body>
                                <p><strong>Ville:</strong> {adresse.nomMunicipalite}</p>
                                <p><strong>Province/État:</strong> {adresse.etat}</p>
                                <p><strong>Code postal:</strong> {adresse.codePostal}</p>
                                <p><strong>Pays:</strong> {adresse.pays}</p>

                                <Link to={`/modification/${id}/${adresse.adresseId}`}>
                                    <Button className="me-2" variant="primary">Modifier</Button>
                                </Link>

                                <Button className="me-2" variant="danger" 
                                onClick={() => gererSuppressionAdresse(adresse.adresseId)}>
                                    Supprimer
                                </Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                    </Accordion>
                </>
            }
            {!chargementClient && !client && <Alert variant="danger">Client introuvable !</Alert>}

        </>
    );
}
