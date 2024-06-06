import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PageListeClients = () => {
    const [clients, setClients] = useState([]);
    const [tri, setTri] = useState('nom');
    const [municipalites, setMunicipalites] = useState([]);
    const [etats, setEtats] = useState([]);
    const [pays, setPays] = useState([]);

    const [municipalitesSelectionnees, setMunicipalitesSelectionnees] = useState([]);
    const [etatsSelectionnes, setEtatsSelectionnes] = useState([]);
    const [paysSelectionnes, setPaysSelectionnes] = useState([]);

    const [compteurMunicipalites, setCompteurMunicipalites] = useState({});
    const [compteurEtats, setCompteurEtats] = useState({});
    const [compteurPays, setCompteurPays] = useState({});

    useEffect(() => {
        fetch("/api/Clients")
            .then(response => response.json())
            .then(data => {
                setClients(data);

                const toutesAdresses = data.flatMap(client => client.adresses);

                const compteurMunicipalitesTemp = {};
                const compteurEtatsTemp = {};
                const compteurPaysTemp = {};

                toutesAdresses.forEach(adresse => {
                    
                    if (compteurMunicipalitesTemp[adresse.nomMunicipalite] === undefined) {
                        compteurMunicipalitesTemp[adresse.nomMunicipalite] = 1;
                    } else {
                        compteurMunicipalitesTemp[adresse.nomMunicipalite]++;
                    }

                    if (compteurEtatsTemp[adresse.etat] === undefined) {
                        compteurEtatsTemp[adresse.etat] = 1;
                    } else {
                        compteurEtatsTemp[adresse.etat]++;
                    }

                    if (compteurPaysTemp[adresse.pays] === undefined) {
                        compteurPaysTemp[adresse.pays] = 1;
                    } else {
                        compteurPaysTemp[adresse.pays]++;
                    }
                });

                setCompteurMunicipalites(compteurMunicipalitesTemp);
                setCompteurEtats(compteurEtatsTemp);
                setCompteurPays(compteurPaysTemp);

                setMunicipalites(Object.keys(compteurMunicipalitesTemp));
                setEtats(Object.keys(compteurEtatsTemp));
                setPays(Object.keys(compteurPaysTemp));
            });
    }, []);

    const gererTri = (e) => {
        setTri(e.target.value);
    }

    const trierClients = (clients) => { 
        return clients.sort((a, b) => {
            if (tri === 'nom') {
                return a.nom.localeCompare(b.nom);
            } else if (tri === 'prenom') {
                return a.prenom.localeCompare(b.prenom);
            }
        });
    }

    const toggleFiltre = (nouvelleValeur, typeFiltre) => {
        const toggle = (selectionnees, setSelectionnees) => {
            setSelectionnees(selectionnees => 
                selectionnees.includes(nouvelleValeur) ? selectionnees.filter(ancienneValeur => ancienneValeur !== nouvelleValeur) : [...selectionnees, nouvelleValeur]
            );
        };
        
        switch (typeFiltre) {
            case 'municipalite':
                toggle(municipalitesSelectionnees, setMunicipalitesSelectionnees);
                break;
            case 'etat':
                toggle(etatsSelectionnes, setEtatsSelectionnes);
                break;
            case 'pays':
                toggle(paysSelectionnes, setPaysSelectionnes);
                break;
            default:
                break;
        }
    }

    const clientsFiltres = clients.filter(client => {
        const adressesClient = client.adresses;
        const filtreMunicipalite = municipalitesSelectionnees.length === 0 || adressesClient.find(adresse => municipalitesSelectionnees.includes(adresse.nomMunicipalite));
        const filtreEtat = etatsSelectionnes.length === 0 || adressesClient.find(adresse => etatsSelectionnes.includes(adresse.etat));
        const filtrePays = paysSelectionnes.length === 0 || adressesClient.find(adresse => paysSelectionnes.includes(adresse.pays));
        return filtreMunicipalite && filtreEtat && filtrePays;
    });

    const clientsTries = trierClients(clientsFiltres);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1>Liste des clients</h1>

                    <Container>
                        <Row className="align-items-center">
                            <Col md={3}>
                                <select onChange={gererTri} value={tri} className='form-select'>
                                    <option value='nom'>Trier par nom</option>
                                    <option value='prenom'>Trier par prénom</option>
                                </select>
                            </Col>
                            <Col md={4} className="text-end">
                                <Link to="/ajout-client">
                                    <Button className="m-2" variant="primary">Ajouter un client</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                    
                    <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Filtres</Accordion.Header>
                            <Accordion.Body>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Municipalité</Accordion.Header>
                                        <Accordion.Body>
                                        {municipalites.map((municipalite, index) => (
                                            <div key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={municipalite}
                                                    onChange={() => toggleFiltre(municipalite, 'municipalite')}
                                                />
                                                <label>
                                                    {municipalite} ({compteurMunicipalites[municipalite]})
                                                </label>
                                            </div>
                                        ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>État</Accordion.Header>
                                        <Accordion.Body>
                                        {etats.map((etat, index) => (
                                            <div key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={etat}
                                                    onChange={() => toggleFiltre(etat, 'etat')}
                                                />
                                                <label>
                                                    {etat} ({compteurEtats[etat]})
                                                </label>
                                            </div>
                                        ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Pays</Accordion.Header>
                                        <Accordion.Body>
                                        {pays.map((pays, index) => (
                                            <div key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={pays}
                                                    onChange={() => toggleFiltre(pays, 'pays')}
                                                />
                                                <label>
                                                    {pays} ({compteurPays[pays]})
                                                </label>
                                            </div>
                                        ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {clients.length === 0 ? (
                        <p>Aucun client trouvé.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ width: '35%' }}>Nom</th>
                                    <th style={{ width: '35%' }}>Prénom</th>
                                    <th style={{ width: '30%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientsTries.map(client => (
                                    <tr key={client.clientId}>
                                        <td>{client.nom}</td>
                                        <td>{client.prenom}</td>
                                        <td>
                                            <Link to={`/modification/${client.clientId}`}>
                                                <Button className='m-2' variant="primary">Modifier</Button>
                                            </Link>
                                            <Link to={`/confirmation-suppression/${client.clientId}`}>
                                                <Button variant="danger">Supprimer</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
