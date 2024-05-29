import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                        <Row className="align-items-center">
                            <Col md={6}>

                                {/*mettre la partie tri*/}
                            </Col>
                            <Col md={6} className="text-end">
                                <Link to="/ajout-client">
                                    <Button className="m-2" variant="primary">Ajouter un client</Button>
                                </Link>
                            </Col>
                        </Row>
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
                                        <Link to={`/modification/${client.clientId}`}>
                                                <Button variant="primary">Modifier</Button>
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
    )

}