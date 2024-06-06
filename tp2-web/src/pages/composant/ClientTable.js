import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ClientTable = ({ clients}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th style={{ width: '35%' }}>Nom</th>
                    <th style={{ width: '35%' }}>Prénom</th>
                    <th style={{ width: '30%' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client => (
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
    );
};

export default ClientTable;