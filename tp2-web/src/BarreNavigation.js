import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export const BarreNavigation = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <Navbar.Brand href="/">TP2 Gabriel M. & Francis D.</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Accueil</Nav.Link>
                        <Nav.Link href="/liste-clients">Liste Clients</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <div>
                {isAuthenticated ? (
                    <Button className="me-3" variant="secondary" onClick={() => logout()}>Se déconnecter </Button>
                ) : (
                    <Button className="me-3" variant="secondary" onClick={() => loginWithRedirect()}>Se connecter </Button>
                )}
            </div>
        </Navbar>
    )
}