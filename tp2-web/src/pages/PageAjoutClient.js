import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useState } from 'react';	

export function PageAjoutClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [donneesValides, setDonneesValides] = useState(true);


    async function gererSoumission(e) {
        // Post request a http://localhost:2323/clients
        // Doc utilisée: https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
        e.preventDefault();

        // Validation des données min 2 caractères pour le nom ou date de naissance plus grand que aujourdhui et
        // affichage du message d'erreur
        if (nom.length < 2 || prenom.length < 2 || dateNaissance > new Date()) {
            setDonneesValides(false);
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
                    setNom('');
                    setPrenom('');
                    setDateNaissance('');
                    alert('Client ajouté avec succès!');
                } else {
                    alert('Erreur lors de l\'ajout du client');
                }
            });
    }


    return (
        <>
        <Alert variant="danger" show={!donneesValides}>
            <ul>
                <li>Les champs nom, prénom doivent contenir au minimum 2 caractères.</li>
                <li>La date de naissance doit être inférieure à la date d'aujourd'hui.</li>
            </ul>
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
            <button type="button" className="btn btn-secondary">Retourner à la liste de clients</button>
        </Form>
        </>
    );
}