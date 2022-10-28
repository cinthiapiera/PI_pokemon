import React from "react";
import { Link } from 'react-router-dom';

function Details() {
    return(
        <div>
            <p>Details</p>
            <Link to="/home"><button>Regresar a Home</button></Link>
        </div>
    )
};

export default Details; 