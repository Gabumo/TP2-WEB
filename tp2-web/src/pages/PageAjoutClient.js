import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

export function PageAjoutClient() {
    return (
        <Container>
            <h1>Ajout de clients</h1>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalNom">
                    <Form.Label column sm={2}>
                        Nom
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Nom" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPrenom">
                    <Form.Label column sm={2}>
                        Prénom
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Prénom" />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}