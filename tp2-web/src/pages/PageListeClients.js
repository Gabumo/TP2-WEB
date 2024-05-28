import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormCheck } from 'react-bootstrap';

export const PageListeClients = () => {
    const [clients, setClients] = useState([]);
    const [filtreClient, setFiltreClient] = useState([]);


    useEffect(() => {
        fetch("/api/Clients")
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
    }, []);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1>Liste des clients</h1>
                    <Container>
                    <Link to="/ajout-client">
                        <Button variant="primary">Ajouter un client</Button>
                    </Link>
                    </Container>
                

                    {clients.length === 0 ? (
                        <p>Aucun client trouvé.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ width: '37.5%' }}>Nom</th>
                                    <th style={{ width: '37.5%' }}>Prénom</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client.clientId}>
                                        <td>{client.nom}</td>
                                        <td>{client.prenom}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => {/*mettre lien pour modifier*/ }}
                                            >
                                                Modifier
                                            </Button>{' '}
                                            <Button
                                                variant="danger"
                                                onClick={() => {/*mettre lien pour supprimer*/ }}
                                            >
                                                Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    )

}