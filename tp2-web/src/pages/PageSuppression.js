import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PageSuppression = () => {
    const { id } = useParams();

    // useEffect(() => {
    //     async function supprimerClient() {



    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1>Suppression du client</h1>
                    <p>Êtes-vous sûr de vouloir supprimer ce client?</p> {/*onclick=mettre un handle pour supprimer*/}
                    <Button variant="danger" className="m-2"  >Supprimer</Button>
                    <Link to="/liste-clients">
                        <Button variant="secondary" className="m-2">Annuler</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}