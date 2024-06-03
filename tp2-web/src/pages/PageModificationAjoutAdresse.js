import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function PageModificationAjoutAdresse() {
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
    const [informationSupplementaire, setInfo] = useState('');

    useEffect(() => {
        async function recupererAdresse() {
            if (adresseId && adresseId !== 'creation') {
                setChargement(true);
                try {
                    const reponse = await fetch(`/api/Clients/${id}/Adresses/${adresseId}`);
                    const donnees = await reponse.json();
                    if (reponse.ok) {
                        setAdresse(donnees);
                        setNumeroCivique(donnees.numeroCivique);
                        setTypeVoie(donnees.typeVoie);
                        setOdonyme(donnees.odonyme);
                        setNomMunicipalite(donnees.nomMunicipalite);
                        setEtat(donnees.etat);
                        setCodePostal(donnees.codePostal);
                        setPays(donnees.pays);
                        setInfo(donnees.informationSupplementaire);
                    } else {
                        setAdresse(null);
                    }
                } catch (error) {
                    console.error("Erreur dans la récupération de l'adresse: ", error);
                    setAdresse(null);
                }
            } 
            setChargement(false);
        }    
        recupererAdresse();
    }, [id, adresseId]);

    function checkErreurs() {
        const nouvellesErreurs = [];

        const numeroCiviqueInt = parseInt(numeroCivique);
        if (isNaN(numeroCiviqueInt) || numeroCiviqueInt < 1) {
            nouvellesErreurs.push('Le numéro civique doit être une valeur numérique positive.');
        }
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
        if (codePostal.trim().length < 5) {
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

        let requestOptions = '';
        if (adresseId !== 'creation') {
            requestOptions = {
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
                    pays,
                    informationSupplementaire
                })
            };
        } else {
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    numeroCivique,
                    typeVoie,
                    odonyme,
                    nomMunicipalite,
                    etat,
                    codePostal,
                    pays,
                    informationSupplementaire
                })
            };
        }

        try {
            const lienApi = adresseId !== 'creation' ? `/api/Clients/${id}/Adresses/${adresseId}` : `/api/Clients/${id}/Adresses`;
            const reponse = await fetch(lienApi, requestOptions);
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
            <h1>{adresseId !== 'creation' ? "Modification d'une adresse" : "Ajouter une adresse"}</h1>
            {chargement && <p>Chargement en cours...</p>}
            {!chargement && (adresseId === 'creation' || adresse) && (
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

                    <Form.Group controlId="infoSupp">
                        <Form.Label>Information supplémentaire</Form.Label>
                        <Form.Control
                            type="text"
                            value={informationSupplementaire}
                            onChange={e => setInfo(e.target.value)}
                        />
                    </Form.Group>

                    <div className="mt-3">
                        <Button className="me-2" variant="primary" type="submit">
                            {adresseId !== 'creation' ? "Modifier" : "Ajouter"}
                        </Button>

                        <Link to={`/modification/${id}`}>
                            <Button className="me-2" variant="secondary">
                                Retourner au client
                            </Button>
                        </Link>
                    </div>

                    {adresseModifie && 
                        <Alert className="mt-3" variant="success">
                           {adresseId !== 'creation' ? "L'adresse a été modifiée." : "L'adresse a été ajoutée."}
                        </Alert>}
                </Form>
            )}
            {!chargement && adresseId !== 'creation' && adresse === null && (
                <Alert variant="danger">Adresse introuvable !</Alert>
            )}
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
