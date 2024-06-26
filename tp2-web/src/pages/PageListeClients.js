import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import FiltreAccordeon from './composant/FiltreAccordeon';
import ClientTable from './composant/ClientTable';
import ClientTri from './composant/ClientTri';
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

                const compteurMunicipalitesTemp = {};
                const compteurEtatsTemp = {};
                const compteurPaysTemp = {};

                data.forEach(client => {

                    client.adresses.forEach(adresse => {
                        if (compteurMunicipalitesTemp[adresse.nomMunicipalite] === undefined) {
                            compteurMunicipalitesTemp[adresse.nomMunicipalite] = 0;
                        }
                        compteurMunicipalitesTemp[adresse.nomMunicipalite]++;
                    });

                    client.adresses.forEach(adresse => {
                        if (compteurEtatsTemp[adresse.etat] === undefined) {
                            compteurEtatsTemp[adresse.etat] = 0;
                        }
                        compteurEtatsTemp[adresse.etat]++;
                    });

                    client.adresses.forEach(adresse => {
                        if (compteurPaysTemp[adresse.pays] === undefined) {
                            compteurPaysTemp[adresse.pays] = 0;
                        }
                        compteurPaysTemp[adresse.pays]++;
                    });
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
    const aucunFiltreSelectionne = municipalitesSelectionnees.length === 0 && etatsSelectionnes.length === 0 && paysSelectionnes.length === 0;

    const clientsFiltres = aucunFiltreSelectionne ? clients : clients.filter(client => {
        const adressesClient = client.adresses;
        const filtreMunicipalite = adressesClient.find(adresse => municipalitesSelectionnees.includes(adresse.nomMunicipalite));
        const filtreEtat = adressesClient.find(adresse => etatsSelectionnes.includes(adresse.etat));
        const filtrePays = adressesClient.find(adresse => paysSelectionnes.includes(adresse.pays));

        console.log('Client:', client.nom);
        console.log('filtreMunicipalite:', filtreMunicipalite);
        console.log('filtreEtat:', filtreEtat);
        console.log('filtrePays:', filtrePays);

        return filtreMunicipalite || filtreEtat || filtrePays;
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
                                <ClientTri tri={tri} gererTri={gererTri} />
                            </Col>
                            <Col md={4} className="text-end">
                                <Link to="/ajout-client">
                                    <Button className="m-2" variant="primary">Ajouter un client</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>

                    <FiltreAccordeon
                        municipalites={municipalites}
                        etats={etats}
                        pays={pays}
                        toggleFiltre={toggleFiltre}
                        compteurMunicipalites={compteurMunicipalites}
                        compteurEtats={compteurEtats}
                        compteurPays={compteurPays}
                    />

                    {clients.length === 0 ? (
                        <p>Aucun client trouvé.</p>
                    ) : (
                        <ClientTable clients={clientsTries} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
