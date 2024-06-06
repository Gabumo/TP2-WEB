import React from "react";
import { Accordion } from "react-bootstrap";

const FiltreAccordeon = ({ municipalites, etats, pays, toggleFiltre, compteurMunicipalites, compteurEtats, compteurPays }) => {
    return (
        <Accordion className="mt-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filtres</Accordion.Header>
                <Accordion.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Municipalité</Accordion.Header>
                            <Accordion.Body>
                                {municipalites.map((municipalite, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            value={municipalite}
                                            onChange={() => toggleFiltre(municipalite, 'municipalite')}
                                        />
                                        <label>
                                            {municipalite} ({compteurMunicipalites[municipalite]})
                                        </label>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>État</Accordion.Header>
                            <Accordion.Body>
                                {etats.map((etat, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            value={etat}
                                            onChange={() => toggleFiltre(etat, 'etat')}
                                        />
                                        <label>
                                            {etat} ({compteurEtats[etat]})
                                        </label>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Pays</Accordion.Header>
                            <Accordion.Body>
                                {pays.map((pays, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            value={pays}
                                            onChange={() => toggleFiltre(pays, 'pays')}
                                        />
                                        <label>
                                            {pays} ({compteurPays[pays]})
                                        </label>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default FiltreAccordeon;