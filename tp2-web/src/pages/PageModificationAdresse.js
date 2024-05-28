import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function PageModificationAdresse() {
    const { id, adresseId } = useParams();
    const [adresse, setAdresse] = useState(null);
    const [numeroCivique, setNumeroCivique] = useState('');
    const [typeVoie, setTypeVoie] = useState('');
    const [odonyme, setOdonyme] = useState('');
    const [nomMunicipalite, setNomMunicipalite] = useState('');
    const [etat, setEtat] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [pays, setPays] = useState('');
    const [adresseModifie, setAdresseModifie] = useState(false);
    const [erreurs, setErreurs] = useState([]);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        async function recupererAdresse() {
            setChargement(true);
            try {
                const reponse = await fetch(`/api/Clients/${id}/Adresses/${adresseId}`);
                const donnees = await reponse.json();
                if (donnees) {
                    setAdresse(donnees);
                    setNumeroCivique(donnees.numeroCivique);
                    setTypeVoie(donnees.typeVoie);
                    setOdonyme(donnees.odonyme);
                    setNomMunicipalite(donnees.nomMunicipalite);
                    setEtat(donnees.etat);
                    setCodePostal(donnees.codePostal);
                    setPays(donnees.pays);
                } else {
                    setAdresse(null);
                }
            } catch (error) {
                console.error("Erreur dans la récupération de l'adresse: ", error);
                setAdresse(null);
            }
            setChargement(false);
        }
        recupererAdresse();
    }, [id, adresseId]);

    function checkErreurs() {
        const nouvellesErreurs = [];

        if (typeVoie.trim().length < 2) {
            nouvellesErreurs.push('Le type de voie doit contenir au moins 2 caractères.');
        }
        if (odonyme.trim().length < 2) {
            nouvellesErreurs.push('L\'odonyme doit contenir au moins 2 caractères.');
        }
        if (nomMunicipalite.trim().length < 2) {
            nouvellesErreurs.push('Le nom de la municipalité doit contenir au moins 2 caractères.');
        }
        if (etat.trim().length < 2) {
            nouvellesErreurs.push('L\'état/province doit contenir au moins 2 caractères.');
        }
        if (codePostal.trim() < 5) {
            // Une recherche google rapide m'indique que les codes postaux en général ne sont pas plus courts que 5 caractères
            // Je n'ai pas fait de regex car les formats de code postal sont différents selon les pays
            nouvellesErreurs.push('Le code postal doit contenir au moins 5 caractères.');
        }
        if (pays.trim().length < 2) {
            nouvellesErreurs.push('Le pays doit contenir au moins 2 caractères.');
        }

        setErreurs(nouvellesErreurs);
        return nouvellesErreurs.length === 0;
    }

    async function gererSoumission(e) {
        e.preventDefault();

        if (!checkErreurs()) {
            return;
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                adresseId,
                numeroCivique,
                typeVoie,
                odonyme,
                nomMunicipalite,
                etat,
                codePostal,
                pays
            })
        };

        try {
            const reponse = await fetch(`/api/Clients/${id}/Adresses/${adresseId}`, requestOptions);
            if (reponse.ok) {
                setAdresseModifie(true);
            } else {
                alert('Erreur lors de la modification de l\'adresse');
            }
        } catch (error) {
            console.error('Erreur lors de la modification de l\'adresse: ', error);
            alert('Erreur lors de la modification de l\'adresse');
        }
    }

    return (
        <>
            <h1>Modification d'une adresse</h1>
            {chargement && <p>Chargement de l'adresse...</p>}
            {!chargement && adresse && (
                <Form onSubmit={gererSoumission}>
                    <Form.Group controlId="numeroCivique">
                        <Form.Label>Numéro Civique</Form.Label>
                        <Form.Control
                            type="text"
                            value={numeroCivique}
                            onChange={e => setNumeroCivique(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="typeVoie">
                        <Form.Label>Type de Voie</Form.Label>
                        <Form.Control
                            type="text"
                            value={typeVoie}
                            onChange={e => setTypeVoie(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="odonyme">
                        <Form.Label>Odonyme</Form.Label>
                        <Form.Control
                            type="text"
                            value={odonyme}
                            onChange={e => setOdonyme(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="nomMunicipalite">
                        <Form.Label>Municipalité</Form.Label>
                        <Form.Control
                            type="text"
                            value={nomMunicipalite}
                            onChange={e => setNomMunicipalite(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="etat">
                        <Form.Label>État/Province</Form.Label>
                        <Form.Control
                            type="text"
                            value={etat}
                            onChange={e => setEtat(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="codePostal">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control
                            type="text"
                            value={codePostal}
                            onChange={e => setCodePostal(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pays">
                        <Form.Label>Pays</Form.Label>
                        <Form.Control
                            type="text"
                            value={pays}
                            onChange={e => setPays(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="mt-3">
                        <Button className="me-2" variant="primary" type="submit">
                            Modifier
                        </Button>

                        <Link to={`/modification/${id}`}>
                            <Button className="me-2" variant="secondary">
                                Retourner au client
                            </Button>
                        </Link>
                    </div>

                    {adresseModifie && <Alert className="mt-3" variant="success">L'adresse a été modifiée.</Alert>}
                </Form>
            )}
            {!chargement && adresse === null && <Alert variant="danger">Adresse introuvable !</Alert>}
            {!chargement && erreurs.length > 0 && (
                <Alert variant="danger" className="mt-3">
                    <p>Les données entrées ne sont pas valides :</p>
                    <ul>
                        {erreurs.map((erreur, index) => (
                            <li key={index}>{erreur}</li>
                        ))}
                    </ul>
                </Alert>
            )}
        </>
    );
}
