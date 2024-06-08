import React from 'react';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function PageAjoutClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [donneesValides, setDonneesValides] = useState(true);
    const [clientAjoute, setClientAjoute] = useState(false);
    const [erreurs, setErreurs] = useState([]);

    // Masquer le message d'alerte d'ajout d'un client après 5 secondes
    // setTimeout non vu en classe, mais je l'ai utilisé dans un des projets AMOC.
    if (clientAjoute) {
        setTimeout(() => {
            setClientAjoute(false);
        }, 5000);
    }

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
        // Post request a http://localhost:2323/clients
        // Doc utilisée: https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
        e.preventDefault();

        // Validation des données min 2 caractères pour le nom ou date de naissance plus grand que aujourdhui et
        // affichage du message d'erreur
        if (!checkErreurs()) {
            setDonneesValides(false);
            //setClientAjoute(false);
            return;
        }
        setDonneesValides(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom: nom, prenom: prenom, dateNaissance: dateNaissance })
        };
        fetch('/api/Clients', requestOptions)
            .then(reponse => reponse.json())
            .then(donnees => {
                console.log(donnees);
                if (donnees.clientId) {
                    setClientAjoute(true);
                    setNom('');
                    setPrenom('');
                    setDateNaissance('');
                } else {
                    alert('Erreur lors de l\'ajout du client');
                }
            });
    }


    return (
        <>
            <Alert variant="success" show={clientAjoute}>
                <p>Client ajouté avec succès!</p>
            </Alert>

            <Form className="mt-3" onSubmit={gererSoumission}>
                <h1>Ajout d'un nouveau client</h1>
                <Form.Group className="mb-2">
                    <Form.Label column sm="2">Nom</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={nom}
                            placeholder="Nom"
                            onChange={e => setNom(e.target.value)}
                            autoFocus
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label column sm="2">Prénom</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={prenom}
                            placeholder="Prénom"
                            onChange={e => setPrenom(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label column sm="2">Date de naissance</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="date"
                            value={dateNaissance}
                            onChange={e => setDateNaissance(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Button className="me-2" variant="success" type="submit">Ajouter</Button>
                <Link to="/liste-clients">
                    <Button type="button" className="btn btn-secondary">Retourner à la liste de clients</Button>
                </Link>

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
            </Form>
        </>
    );
}