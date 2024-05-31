import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PageListeClients = () => {
    const [clients, setClients] = useState([]);
    const [tri, setTri] = useState('nom');


    useEffect(() => {
        fetch("/api/Clients")
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
    }, []);

    const gererTri = (e) => {
        setTri(e.target.value);
    }
    const trierClients = (clients) => { //ajouter la 2eme partie du tri
        return clients.sort((a, b) => {
            if (tri === 'nom') {
                return a.nom.localeCompare(b.nom);
            } else if (tri === 'prenom') {
                return a.prenom.localeCompare(b.prenom);
            }
        });
    }
    const clientsTries = trierClients(clients);

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
    )

}