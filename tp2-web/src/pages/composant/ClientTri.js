import React from "react";

const ClientTri = ({ tri, gererTri }) => {
    return (
        <select onChange={gererTri} value={tri} className='form-select'>
            <option value='nom'>Trier par nom</option>
            <option value='prenom'>Trier par prénom</option>
        </select>
    );
};

export default ClientTri;